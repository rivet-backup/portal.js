import { LitElement, html, customElement, property, css, PropertyValues, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { cssify } from '../../utils/css';
import { styleMap } from 'lit-html/directives/style-map';
import utils from '../../utils/utils';
import styles from './avatar-collage.scss';
import * as api from '../../utils/api';
import { tooltip } from '../../ui/helpers';
import { padAccountNumber } from '../../data/identity';

@customElement('avatar-collage')
export default class AvatarCollage extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	identities: api.identity.IdentityHandle[];

	@property({ type: Number })
	size: number = 20;

	@property({ type: Number })
	max: number = 8;

	render() {
		let style = styleMap({ '--size': `${this.size}px` });

		let identities = [...this.identities].reverse();
		let overflow = 0;

		// Max out list
		if (this.max != -1) {
			if (identities.length > this.max) overflow = identities.length - this.max;

			identities = identities.slice(0, this.max);
		}

		return html` <div id="base" style=${style}>
			<div id="identities">
				${repeat(
					identities,
					u => u.id,
					u =>
						html`<div class="identity-clip">
							<identity-avatar
								id="main-avatar"
								hide-status
								.identity=${u}
								@pointerenter=${tooltip(
									`${u.displayName}#${padAccountNumber(u.accountNumber)}`
								)}
							></identity-avatar>
						</div>`
				)}
			</div>
			${overflow ? html`<div id="overflow">+${overflow}</div>` : null}
		</div>`;
	}
}
