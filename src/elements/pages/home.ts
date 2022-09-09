import { LitElement, html, customElement, property, css, query } from 'lit-element';
import { cssify } from '../../utils/css';
import styles from './home.scss';
import { MenuItem } from '../sidebar/main-sidebar';

@customElement('page-home')
export default class HomePage extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	activeMenu: MenuItem = null;

	render() {
		return html`
			<div id="base">
				<main-sidebar .activeMenu=${this.activeMenu}></main-sidebar>
			</div>
		`;
	}
}
