import { LitElement, html, customElement, property } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './group-handle-tile.scss';
import routes from '../../routes';

import { groupRouteData } from '../../data/group';
import utils from '../../utils/utils';
import cloud from '@rivet-gg/cloud';
import { classMap } from 'lit-html/directives/class-map';
import { showGroupContextMenu } from '../../ui/helpers';
import * as api from '../../utils/api';

@customElement('group-handle-tile')
export default class GroupTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	group: api.group.GroupHandle | cloud.GroupSummary;

	@property({ type: Boolean, attribute: 'no-link' })
	noLink: boolean = false;

	@property({ type: Boolean, attribute: 'light' })
	light: boolean = false;

	isHovering: boolean;

	connectedCallback() {
		super.connectedCallback();

		// TODO: Update events
	}

	disconnectedCallback() {
		super.disconnectedCallback();
	}

	render() {
		let classes = classMap({
			light: this.light,
			'has-link': !this.noLink
		});

		return html`<div
			id="base"
			class=${classes}
			@contextmenu=${showGroupContextMenu(isHandle(this.group) ? this.group.id : this.group.groupId)}
		>
			${this.noLink
				? null
				: html`<a
						id="link"
						href=${routes.group.build(
							isHandle(this.group) ? groupRouteData(this.group) : { id: this.group.groupId }
						)}
				  ></a>`}
			<group-avatar .light=${this.light} .group=${this.group}></group-avatar>
			<div id="spaced">
				<div id="content">
					<h1 id="group-name">${this.group.displayName}</h1>
				</div>
				<slot name="right"></slot>
			</div>
		</div>`;
	}
}

function isHandle(group: api.group.GroupHandle | cloud.GroupSummary): group is api.group.GroupHandle {
	return !group.hasOwnProperty('groupId');
}
