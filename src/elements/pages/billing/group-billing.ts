import { LitElement, html, customElement, property, PropertyValues, query } from 'lit-element';
import { tooltip } from '../../../ui/helpers';
import { cssify } from '../../../utils/css';
import styles from './group-billing.scss';
import global from '../../../utils/global';
import cloud from '@rivet-gg/cloud';
import * as api from '../../../utils/api';
import utils from '../../../utils/utils';
import { CustomError, responses } from '../../../routes';
import { repeat } from 'lit-html/directives/repeat';
import { getRegionEmoji } from '../../../utils/emoji';
import UIRouter from '../../root/ui-router';
import { SliderChangeEvent } from '../../common/range-slider';
import TextInput, { InputUpdateEvent } from '../../dev/text-input';
import { classMap } from 'lit-html/directives/class-map';
import { GroupProfileCache } from '../../../data/cache';
import { DropDownSelectEvent } from '../../dev/drop-down-list';
import moment from 'moment';
import logging from '../../../utils/logging';

const MAX_PAYMENT = 50000;

enum CheckoutState {
	Options,
	Card,
	BankTransfer
}

enum ContentTab {
	RegionBreakdown,
	Payments,
	BankTransfers,
	Invoices
}

enum DateRange {
	Today,
	Yesterday,
	Last7Days,
	Last7DaysFromYesterday,
	Last14Days,
	Last30Days,
	ThisWeek,
	LastWeek,
	ThisMonth,
	LastMonth
}

interface GameBillingData {
	game: cloud.GameHandle;
	subtotal: number;
	namespaces: NamespaceBillingData[];
}

interface NamespaceBillingData {
	namespaceId: string;
	namespace: cloud.NamespaceSummary;
	subtotal: number;
	lobbyGroups: LobbyGroupBillingData[];
}

interface LobbyGroupBillingData {
	lobbyGroupNameId: string;
	expenses: cloud.RegionTierExpenses[];
	subtotal: number;
}

@customElement('page-group-billing')
export default class GroupBillingPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	groupId: string;

	@property({ type: Object })
	profile?: api.group.GroupProfile;

	@property({ type: Object })
	groupBillingData: {
		billing: cloud.GroupBillingSummary;
		bankSource: cloud.GroupBankSource;
		availableRegions: cloud.RegionSummary[];
	} = null;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Object })
	paymentData: cloud.GetGroupPaymentsListCommandOutput = null;

	@property({ type: Object })
	bankTransferData: cloud.GetGroupTransfersListCommandOutput = null;

	@property({ type: Object })
	invoiceData: cloud.GetGroupInvoicesListCommandOutput = null;

	@property({ type: Object })
	loadError?: any;

	@property({ type: Number })
	dateRange: DateRange = DateRange.ThisMonth;

	@property({ type: Number })
	expensesTotal: number = null;

	@property({ type: Object })
	gameBillingData: GameBillingData[] = null;

	@property({ type: Boolean })
	isExporting: boolean = false;

	// === CHECKOUT COMPONENTS ===
	@property({ type: Boolean })
	checkoutModalActive: boolean = false;

	@property({ type: Number })
	checkoutValue: number = 5;

	@query('#checkout-input')
	checkoutInput: TextInput;

	@property({ type: Number })
	checkoutState: CheckoutState = CheckoutState.Options;

	@property({ type: Number })
	contentTab: ContentTab = ContentTab.RegionBreakdown;

	// === EVENT HANDLERS ===
	groupStream?: api.RepeatingRequest<api.group.GetGroupProfileCommandOutput>;

	async firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Fetch tier options
		let res = await global.cloud.getRegionTiers({});
		this.tiers = res.tiers;

		this.resetGroupData();
		this.resetData();
		this.fetchGroup();
		[this.paymentData, this.bankTransferData, this.invoiceData] = await Promise.all([
			global.cloud.getGroupPaymentsList({ groupId: this.groupId }),
			global.cloud.getGroupTransfersList({ groupId: this.groupId }),
			global.cloud.getGroupInvoicesList({ groupId: this.groupId })
		]);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		if (changedProperties.has('dateRange')) {
			this.fetchGroupBilling();
		}
	}

	resetData() {
		this.groupBillingData = null;
	}

	async fetchGroupBilling() {
		let { queryStart, queryEnd } = this.calcDateRange();

		try {
			// this.groupBillingData = null;
			this.gameBillingData = null;
			this.expensesTotal = null;
			this.groupBillingData = await global.cloud.getGroupBilling({
				groupId: this.groupId,
				queryStart,
				queryEnd
			});

			// Set default checkout value
			this.checkoutValue = Math.max(5, Math.ceil(-this.groupBillingData.billing.balance / 100));
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) {
				if (err.status == 403)
					this.loadError = new CustomError('Forbidden', 'Only the group owner can access billing.');
				else this.loadError = await err.json();
			}
		}

		let gameBillingData = [];
		for (let game of this.groupBillingData.billing.games) {
			let gameSubtotal = 0;
			let namespaces: NamespaceBillingData[] = [];
			for (let expense of game.expenses) {
				gameSubtotal += expense.expenses;

				// Get or create namespace
				let namespace = namespaces.find(x => x.namespaceId == expense.namespaceId);
				if (!namespace) {
					namespace = {
						namespaceId: expense.namespaceId,
						namespace: game.namespaces.find(x => x.namespaceId == expense.namespaceId),
						subtotal: 0,
						lobbyGroups: []
					};
					namespaces.push(namespace);
				}

				namespace.subtotal += expense.expenses;

				// Get or create lobby group
				let lobbyGroup = namespace.lobbyGroups.find(
					x => x.lobbyGroupNameId == expense.lobbyGroupNameId
				);
				if (!lobbyGroup) {
					lobbyGroup = {
						lobbyGroupNameId: expense.lobbyGroupNameId,
						expenses: [],
						subtotal: 0
					};
					namespace.lobbyGroups.push(lobbyGroup);
				}

				lobbyGroup.expenses.push(expense);
				lobbyGroup.subtotal += expense.expenses;
			}

			namespaces = namespaces.sort((a, b) => b.subtotal - a.subtotal);
			for (let namespace of namespaces) {
				namespace.lobbyGroups = namespace.lobbyGroups.sort((a, b) => b.subtotal - a.subtotal);
			}

			// Calculate subtotals
			gameBillingData.push({
				game: game.game,
				subtotal: gameSubtotal,
				namespaces
			});
		}

		this.gameBillingData = gameBillingData.sort((a, b) => b.subtotal - a.subtotal);
		this.expensesTotal = nearestCent(
			this.groupBillingData.billing.games
				.flatMap(game => game.expenses)
				.reduce((s, a) => s + a.expenses, 0)
		);
	}

	resetGroupData() {
		// Remove old group data
		this.profile = null;
		if (this.groupStream) this.groupStream.cancel();
	}

	async fetchPaymentData() {
		if (!this.paymentData) return;

		try {
			let paymentData = await global.cloud.getGroupPaymentsList({
				groupId: this.groupId,
				startPaymentId: this.paymentData.endPaymentId
			});

			this.paymentData.payments.push(...paymentData.payments);
			this.paymentData.endPaymentId = paymentData.endPaymentId;
			this.requestUpdate('paymentData');
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async fetchBankTransferData() {
		if (!this.bankTransferData) return;

		try {
			let bankTransferData = await global.cloud.getGroupTransfersList({
				groupId: this.groupId,
				startTransferId: this.bankTransferData.endTransferId
			});

			this.bankTransferData.transfers.push(...bankTransferData.transfers);
			this.bankTransferData.endTransferId = bankTransferData.endTransferId;
			this.requestUpdate('bankTransferData');
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async fetchInvoiceData() {
		if (!this.invoiceData) return;

		try {
			let invoiceData = await global.cloud.getGroupInvoicesList({
				groupId: this.groupId,
				anchor: this.invoiceData.anchor
			});

			this.invoiceData.invoices.push(...invoiceData.invoices);
			this.invoiceData.anchor = invoiceData.anchor;
			this.requestUpdate('bankTransferData');
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	async fetchGroup() {
		// Fetch events
		this.groupStream = await GroupProfileCache.watch(this.groupId, profile => {
			this.profile = profile;

			// Update the title
			UIRouter.shared.updateTitle(`Billing - ${this.profile.displayName}`);
		});

		this.groupStream.onError(err => {
			logging.error('Request error', err);
			this.loadError = err;
		});
	}

	async checkout() {
		try {
			let res = await global.cloud.groupBillingCheckout({
				groupId: this.groupId,
				amount: this.checkoutValue * 100000 // In thousandths cents
			});

			UIRouter.shared.navigate(res.url, { replacePage: true });
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}
	}

	changeCheckoutValue(event: SliderChangeEvent | InputUpdateEvent) {
		this.checkoutValue = parseInt(event.value as any);

		if (event instanceof SliderChangeEvent) {
			this.checkoutInput.reset();
		}
	}

	openCheckoutModal() {
		this.checkoutModalActive = true;
	}

	checkoutModalClose() {
		this.checkoutModalActive = false;
		this.checkoutState = CheckoutState.Options;
	}

	changeCheckoutState(state: CheckoutState) {
		this.checkoutState = state;

		if (this.checkoutState == CheckoutState.Card) {
			this.updateComplete.then(async () => {
				await this.getUpdateComplete();

				this.checkoutInput.focus();
			});
		}
	}

	changeContentTab(tab: ContentTab) {
		this.contentTab = tab;
	}

	calcDateRange(): { queryStart: number; queryEnd: number } {
		// NOTE: `now` and `today` are the same date except for that `today` has hours, minutes,
		// secs, and ms set to 0 (is start of day). They are used differently in each export range.
		let now = new Date();
		let currentMonth = now.getUTCMonth();
		let currentDate = now.getUTCDate();
		let currentDay = now.getUTCDay(); // Day of week
		let today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

		let queryStart = 0;
		let queryEnd = Date.now();

		if (this.dateRange == DateRange.Today) {
			queryStart = today;
			queryEnd = Date.now();
		} else if (this.dateRange == DateRange.Yesterday) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 1);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last7Days) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 7);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last7DaysFromYesterday) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 8);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last14Days) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 14);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.Last30Days) {
			let date = new Date(today);
			date.setUTCDate(currentDate - 30);

			queryStart = date.getTime();
			queryEnd = today;
		} else if (this.dateRange == DateRange.ThisWeek) {
			let date = new Date(today);
			date.setUTCDate(currentDate - currentDay);

			queryStart = date.getTime();
			queryEnd = Date.now();
		} else if (this.dateRange == DateRange.LastWeek) {
			let date = new Date(today);
			date.setUTCDate(currentDate - currentDay - 7);
			let dateEnd = new Date(today);
			dateEnd.setUTCDate(currentDate - currentDay);

			queryStart = date.getTime();
			queryEnd = dateEnd.getTime();
		} else if (this.dateRange == DateRange.ThisMonth) {
			let date = new Date(today);
			date.setUTCDate(1);

			queryStart = date.getTime();
			queryEnd = Date.now();
		} else if (this.dateRange == DateRange.LastMonth) {
			let date = new Date(today);
			date.setUTCMonth(currentMonth - 1);
			date.setUTCDate(1);
			let dateEnd = new Date(today);
			dateEnd.setUTCDate(1);

			queryStart = date.getTime();
			queryEnd = dateEnd.getTime();
		}

		return { queryStart, queryEnd };
	}

	async updateDateRange(event: DropDownSelectEvent) {
		this.dateRange = event.selection.value;
	}

	async exportLobbyHistory(gameId: string) {
		this.isExporting = true;

		try {
			let { queryStart, queryEnd } = this.calcDateRange();
			let res = await global.cloud.exportMatchmakerLobbyHistory({
				gameId,
				queryStart,
				queryEnd
			});

			// Format export filename
			let gameExpenses = this.groupBillingData.billing.games.find(g => g.game.id == gameId);
			logging.event(
				'Export',
				gameExpenses ? gameExpenses.game.nameId : null,
				`${moment(queryStart).format('YYYY/MM/DD')}`,
				'-',
				`${moment(queryEnd).format('YYYY/MM/DD')}`
			);

			utils.clickHiddenLink(res.url, 'convert.csv');
		} catch (err) {
			this.loadError = err;

			if (err.hasOwnProperty('statusText')) this.loadError = await err.json();
		}

		this.isExporting = false;
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<div id="base">
				<div id="centered-base">
					<!-- Header -->
					<page-header>
						<e-svg src="solid/money-check"></e-svg>
						<h1>Billing${this.profile ? ` - ${this.profile.displayName}` : null}</h1>
					</page-header>

					<div id="actions">
						<div
							class=${classMap({
								tab: true,
								active: this.contentTab == ContentTab.RegionBreakdown
							})}
							@click=${this.changeContentTab.bind(this, ContentTab.RegionBreakdown)}
						>
							<span>Charges Breakdown</span>
							<div class="tab-gutter">
								<div class="tab-gutter-piece"></div>
							</div>
						</div>
						<div
							class=${classMap({ tab: true, active: this.contentTab == ContentTab.Payments })}
							@click=${this.changeContentTab.bind(this, ContentTab.Payments)}
						>
							<span>Payments</span>
							<div class="tab-gutter">
								<div class="tab-gutter-piece"></div>
							</div>
						</div>
						<div
							class=${classMap({
								tab: true,
								active: this.contentTab == ContentTab.BankTransfers
							})}
							@click=${this.changeContentTab.bind(this, ContentTab.BankTransfers)}
						>
							<span>Bank Transfers</span>
							<div class="tab-gutter">
								<div class="tab-gutter-piece"></div>
							</div>
						</div>
						<div
							class=${classMap({
								tab: true,
								active: this.contentTab == ContentTab.Invoices
							})}
							@click=${this.changeContentTab.bind(this, ContentTab.Invoices)}
						>
							<span>Invoices</span>
							<div class="tab-gutter">
								<div class="tab-gutter-piece"></div>
							</div>
						</div>
					</div>

					${this.contentTab == ContentTab.Payments
						? this.renderPaymentsList()
						: this.contentTab == ContentTab.BankTransfers
						? this.renderBankTransfersList()
						: this.contentTab == ContentTab.Invoices
						? this.renderInvoicesList()
						: this.renderGamesBreakdown()}
				</div>
			</div>
			${this.renderCheckoutModal()}
		`;
	}

	renderGamesBreakdown() {
		let dateOptions = [
			{ label: 'Today', value: DateRange.Today },
			{ label: 'Yesterday', value: DateRange.Yesterday },
			{ label: 'Last 7 Days', value: DateRange.Last7Days },
			{ label: 'Last 7 Days from Yesterday', value: DateRange.Last7DaysFromYesterday },
			{ label: 'Last 14 Days', value: DateRange.Last14Days },
			{ label: 'Last 30 Days', value: DateRange.Last30Days },
			{ label: 'This Week', value: DateRange.ThisWeek },
			{ label: 'Last Week', value: DateRange.LastWeek },
			{ label: 'This Month', value: DateRange.ThisMonth },
			{ label: 'Last Month', value: DateRange.LastMonth }
		];
		let dateSelection = dateOptions.find(x => x.value == this.dateRange);
		let { queryStart, queryEnd } = this.calcDateRange();

		return html`<div id="games">
			<!-- Date range -->
			<div id="period-actions">
				<h2>Period</h2>
				<drop-down-list
					id="date-range"
					.selection=${dateSelection}
					.options=${dateOptions}
					@select=${this.updateDateRange.bind(this)}
				></drop-down-list>
			</div>

			<!-- Billing header -->
			${this.expensesTotal != null
				? html`<div id="card-overview">
						<div id="current-charges">
							<billing-card>
								<h1 slot="header">Charges ${dateSelection.label}</h1>
								<price-display slot="amount" .amount=${this.expensesTotal}></price-display>
								<h3 slot="footer">
									${utils.formatDateUTCShort(queryStart)} -
									${utils.formatDateUTCShort(queryEnd - 1)}
								</h3>
							</billing-card>
						</div>
						<div id="balance">
							<div id="balance-gutter">
								<div id="gutter-piece"></div>
							</div>
							<billing-card>
								<h2 slot="header" id="balance-header">
									Balance
									<e-svg
										src="solid/circle-question"
										@mouseenter=${tooltip(
											'Balance is not updated instantly, payments can take up to 24 hours to complete.'
										)}
									></e-svg>
								</h2>
								<div slot="amount">
									<price-display
										.amount=${this.groupBillingData.billing.balance / 100}
									></price-display>
								</div>
								<stylized-button
									slot="actions"
									id="make-payment"
									color="#ececec"
									text="#151515"
									.trigger=${this.openCheckoutModal.bind(this)}
									>Make Payment</stylized-button
								>
							</billing-card>
						</div>
				  </div>`
				: null}

			<!-- Loading/empty state -->
			${!this.gameBillingData || this.expensesTotal == null
				? html`<loading-wheel></loading-wheel>`
				: null}
			${this.groupBillingData && this.gameBillingData && this.groupBillingData.billing.games.length == 0
				? html`<div id="no-data">No games found</div>`
				: null}

			<!-- Region list -->
			${repeat(
				this.gameBillingData ?? [],
				g => g.game.id,
				gameExpenses => {
					return html`<div class="game">
						<div class="game-header">
							<div class="left">
								<!-- TODO: Game icon -->
								<h1>${gameExpenses.game.displayName}</h1>
							</div>
							<div class="right">
								<price-display
									slot="amount"
									.amount=${gameExpenses.subtotal / 100000}
									decimal-places="3"
								></price-display>
							</div>
						</div>
						<div class="game-actions">
							${this.isExporting
								? html`<loading-wheel custom></loading-wheel>`
								: html`<stylized-button
										?small=${global.isMobile}
										.trigger=${this.exportLobbyHistory.bind(this, gameExpenses.game.id)}
										>Export Data</stylized-button
								  >`}
						</div>
						${repeat(
							gameExpenses.namespaces,
							ns => ns.namespaceId,
							ns => html`<div class="game-namespace">
								<h3>${ns.namespace.displayName}</h3>
								<div class="game-lobby-groups">
									${repeat(
										ns.lobbyGroups,
										lb => lb.lobbyGroupNameId,
										this.renderLobbyGroup.bind(this)
									)}
								</div>
							</div>`
						)}
					</div>`;
				}
			)}
		</div>`;
	}

	renderLobbyGroup(lobbyGroup: LobbyGroupBillingData) {
		return html`<div class="lobby-group-expenses">
			<div class="game-lobby-header">
				<div class="left">
					<!-- TODO: Game icon -->
					<h2>${lobbyGroup.lobbyGroupNameId}</h2>
				</div>
				<div class="right">
					<price-display slot="amount" .amount=${lobbyGroup.subtotal / 100000}></price-display>
				</div>
			</div>

			<div class="game-lobby-grid">
				${repeat(
					lobbyGroup.expenses,
					rt => rt.regionId,
					regionTier => {
						// Get lobby region emoji
						let regionData = this.groupBillingData.availableRegions.find(
							r => r.regionId == regionTier.regionId
						);
						let regionIcon = getRegionEmoji(regionData.universalRegion);

						let tierConfig = this.tiers.find(t => t.tierNameId == regionTier.tierNameId);
						let pricePerHour = tierConfig
							? (tierConfig.pricePerSecond / 1000000000000) * 60 * 60
							: null;

						return html`
							<div class="cell region-name">
								<e-svg class="region-icon" preserve src=${regionIcon}></e-svg>
								<h2>${regionData.regionDisplayName}</h2>
							</div>
							<div
								class="cell tier-name"
								@mouseenter=${pricePerHour ? tooltip(`$${pricePerHour}/hr`) : null}
							>
								<e-svg
									class="cores"
									src=${`billing/core/${regionTier.tierNameId.replace(/\//, '-')}`}
								>
								</e-svg>
								<span>${regionTier.tierNameId}</span>
							</div>
							<div
								class="cell region-duration"
								@mouseenter=${tooltip('Total active time of this region')}
							>
								<e-svg src="solid/clock"></e-svg>
								<span>${utils.formatDuration(regionTier.uptime * 1000)}</span>
							</div>
							<div class="cell expense">
								<price-display
									slot="amount"
									.amount=${regionTier.expenses / 100000}
								></price-display>
							</div>
						`;
					}
				)}
			</div>
		</div>`;
	}

	renderPaymentsList() {
		return html`<div id="payments">
			${this.paymentData
				? this.paymentData.payments.length == 0
					? html`<div id="no-data">No payments found</div>`
					: null
				: html`<div id="no-data">Fetching payments....</div>`}
			<div id="items">
				${this.paymentData
					? this.paymentData.payments.length == 0
						? html`<div id="no-data">No payments found</div>`
						: null
					: html`<div id="no-data">Fetching payments....</div>`}
				<div id="items">
					${this.paymentData
						? repeat(
								this.paymentData.payments,
								p => p.createdTs,
								payment => {
									let paymentClasses = classMap({
										payment: true,
										pending: payment.status == 'Processing',
										refunded: payment.status == 'Refunded',
										invoice: payment.fromInvoice
									});

									return html`<div class=${paymentClasses}>
										<div class="left">
											<h2 class="payment-description">
												${payment.description ?? 'Credit Purchase'}
											</h2>
											<date-display
												class="payment-date"
												.timestamp=${payment.createdTs * 1000}
											></date-display>
										</div>
										<div class="right">
											<price-display
												class="payment-amount"
												.amount=${(payment.amount / 100) *
												(payment.fromInvoice ? -1 : 1)}
											></price-display>
											${payment.status == 'Succeeded'
												? html`<e-svg
														class="payment-status"
														src="solid/check"
														@mouseenter=${tooltip('Payment succeeded')}
												  ></e-svg>`
												: payment.status == 'Refunded'
												? html`<e-svg
														class="payment-status"
														src="solid/arrow-rotate-left"
														@mouseenter=${tooltip('Payment refunded')}
												  ></e-svg>`
												: html`<e-svg
														class="payment-status"
														src="solid/clock"
														@mouseenter=${tooltip('Payment pending')}
												  ></e-svg>`}
										</div>
									</div>`;
								}
						  )
						: null}
				</div>
				${this.paymentData && this.paymentData.endPaymentId !== null
					? html`<stylized-button
							id="load-more-payments"
							.trigger=${this.fetchPaymentData.bind(this)}
							>Load more</stylized-button
					  >`
					: null}
			</div>
			${this.paymentData && this.paymentData.endPaymentId !== undefined
				? html`<stylized-button
						id="load-more-payments"
						color="#989898"
						.trigger=${this.fetchPaymentData.bind(this)}
						>Load more</stylized-button
				  >`
				: null}
		</div>`;
	}

	renderBankTransfersList() {
		return html`<div id="transfers">
			${this.bankTransferData
				? this.bankTransferData.transfers.length == 0
					? html`<div id="no-data">No transfers found</div>`
					: null
				: html`<div id="no-data">Fetching transfers....</div>`}
			<div id="items">
				${this.bankTransferData
					? this.bankTransferData.transfers.length == 0
						? html`<div id="no-data">No transfers found</div>`
						: null
					: html`<div id="no-data">Fetching transfers....</div>`}
				<div id="items">
					${this.bankTransferData
						? repeat(
								this.bankTransferData.transfers,
								t => t.createdTs,
								transfer => {
									let transferClasses = classMap({
										transfer: true,
										pending: transfer.status == 'Processing',
										refunded: transfer.status == 'Refunded'
									});

									return html`<div class=${transferClasses}>
										<div class="left">
											<h2 class="transfer-description">
												<e-svg src="solid/bank"></e-svg>
												${transfer.description
													? transfer.description.toUpperCase().replace(/_/g, ' ')
													: 'Unnamed Transfer'}
											</h2>
											<date-display
												class="transfer-date"
												.timestamp=${transfer.createdTs * 1000}
											></date-display>
										</div>
										<div class="right">
											<price-display
												class="transfer-amount"
												.amount=${transfer.amount / 100}
											></price-display>
											${transfer.status == 'Succeeded'
												? html`<e-svg
														class="transfer-status"
														src="solid/check"
														@mouseenter=${tooltip('Transfer succeeded')}
												  ></e-svg>`
												: transfer.status == 'Refunded'
												? html`<e-svg
														class="transfer-status"
														src="solid/arrow-rotate-left"
														@mouseenter=${tooltip('Transfer refunded')}
												  ></e-svg>`
												: html`<e-svg
														class="transfer-status"
														src="solid/clock"
														@mouseenter=${tooltip('Transfer pending')}
												  ></e-svg>`}
										</div>
									</div>`;
								}
						  )
						: null}
				</div>
				${this.bankTransferData && this.bankTransferData.endTransferId !== null
					? html`<stylized-button
							id="load-more-transfers"
							.trigger=${this.fetchBankTransferData.bind(this)}
							>Load more</stylized-button
					  >`
					: null}
			</div>
			${this.bankTransferData && this.bankTransferData.endTransferId !== undefined
				? html`<stylized-button
						id="load-more-transfers"
						color="#989898"
						.trigger=${this.fetchBankTransferData.bind(this)}
						>Load more</stylized-button
				  >`
				: null}
		</div>`;
	}

	renderInvoicesList() {
		return html`<div id="invoices">
			${this.invoiceData
				? this.invoiceData.invoices.length == 0
					? html`<div id="no-data">No invoices found</div>`
					: null
				: html`<div id="no-data">Fetching invoices....</div>`}
			<div id="items">
				${this.invoiceData
					? repeat(
							this.invoiceData.invoices,
							i => i.periodStartTs,
							invoice => {
								let invoiceClasses = classMap({
									invoice: true
								});

								return html`<div class=${invoiceClasses}>
									<div class="left">
										<date-display .timestamp=${invoice.periodStartTs}></date-display>
										&nbsp;-&nbsp;
										<date-display .timestamp=${invoice.periodEndTs}></date-display>
									</div>
									<div class="right">
										<icon-button
											large
											href=${invoice.pdfUrl}
											src="solid/file-pdf"
											@mouseenter=${tooltip('Download PDF')}
										></icon-button>
										<icon-button
											large
											href=${invoice.csvUrl}
											src="solid/file-csv"
											@mouseenter=${tooltip('Download CSV')}
										></icon-button>
									</div>
								</div>`;
							}
					  )
					: null}
			</div>
			${this.invoiceData && this.invoiceData.anchor !== undefined
				? html`<stylized-button
						id="load-more-invoices"
						color="#989898"
						.trigger=${this.fetchInvoiceData.bind(this)}
						>Load more</stylized-button
				  >`
				: null}
		</div>`;
	}

	renderCheckoutModal() {
		return html`<drop-down-modal
			id="checkout-modal"
			?active=${this.checkoutModalActive}
			@close=${this.checkoutModalClose.bind(this)}
		>
			<modal-body slot="body">
				${this.checkoutState == CheckoutState.Card
					? this.renderCheckout()
					: this.checkoutState == CheckoutState.BankTransfer
					? this.renderBankTransfer()
					: this.renderCheckoutOptions()}
			</modal-body>
		</drop-down-modal>`;
	}

	renderCheckoutOptions() {
		return html`<h1>How would you like to checkout?</h1>
			<div class="buttons-holder">
				<stylized-button .trigger=${this.changeCheckoutState.bind(this, CheckoutState.Card)}
					>Via Card</stylized-button
				>
				<stylized-button .trigger=${this.changeCheckoutState.bind(this, CheckoutState.BankTransfer)}
					>Via Bank Transfer</stylized-button
				>
			</div>`;
	}

	renderCheckout() {
		return html`<h1>Choose credit amount</h1>
			<div id="checkout-price">
				<div id="dollar-sign">$</div>
				<text-input
					id="checkout-input"
					light
					number
					.init=${this.checkoutValue.toString()}
					min="5"
					max="${MAX_PAYMENT}"
					placeholder="0.00"
					@input=${this.changeCheckoutValue.bind(this)}
				></text-input>
			</div>
			<stylized-button .trigger=${this.checkout.bind(this)}> Checkout </stylized-button>`;
	}

	renderBankTransfer() {
		// TODO: Fallback if this.data.bankSource is null
		return html`<h1><e-svg src="solid/bank"></e-svg>ACH Credit Transfer</h1>
			<p>Start a bank transfer with your bank using the given credentials:</p>
			<div id="bank-info">
				<div class="kv-pair">
					<h3>ROUTING NUMBER</h3>
					<b>${this.groupBillingData.bankSource.routingNumber}</b>
				</div>
				<div class="kv-pair">
					<h3>ACCOUNT NUMBER</h3>
					<b>${this.groupBillingData.bankSource.accountNumber}</b>
				</div>
			</div>
			<p>Bank transfers typically take 2-5 days to complete.</p>
			<stylized-button .trigger=${() => (this.checkoutModalActive = false)}>Dismiss</stylized-button>`;
	}
}

// Converts how Rivet stores money into cents
function nearestCent(amount: number) {
	return Math.ceil(amount / 1000) / 100;
}
