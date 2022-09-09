import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { cssify } from '../../utils/css';
import styles from './group-avatar.scss';
import utils from '../../utils/utils';
import routes from '../../routes';
import { groupRouteData } from '../../data/group';
import * as api from '../../utils/api';

@customElement('group-avatar')
export default class GroupAvatar extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	group: api.group.GroupHandle | api.group.GroupProfile;

	@property({ type: Boolean })
	rounded: boolean = true;

	@property({ type: Boolean, attribute: 'no-placeholder' })
	noPlaceholder: boolean = false;

	@property({ type: String })
	imagePlaceholder: string = null;

	@property({ type: String })
	placeholderOverride: string = null;

	@property({ type: Boolean })
	shadow: boolean = false;

	@property({ type: Boolean })
	light: boolean = false;

	@property({ attribute: 'icon-fill', type: String })
	iconFill: string = '#ffffff';

	@property({ type: Boolean, attribute: 'link' })
	link: boolean = false;

	render() {
		// Build classes and style
		let classes = {
			rounded: this.rounded,
			shadow: this.shadow,
			light: this.light
		};

		let imageSrc = this.imagePlaceholder ?? this.group.avatarUrl;

		// Create body
		let body = imageSrc
			? html`<lazy-img id="avatar-image" src="${imageSrc}"></lazy-img>`
			: this.noPlaceholder
			? null
			: html`<div id="avatar-placeholder">
					<span>${utils.getGroupInitials(this.placeholderOverride ?? this.group.displayName)}</span>
			  </div>`;

		// Create link
		if (this.link)
			return html`<a
				id="group-avatar"
				class=${classMap(classes)}
				href=${routes.group.build(groupRouteData(this.group))}
				>${body}</a
			>`;
		else return html`<div id="group-avatar" class=${classMap(classes)}>${body}</div>`;
	}
}
