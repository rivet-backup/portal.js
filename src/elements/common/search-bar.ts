import { LitElement, html, customElement, property, css } from 'lit-element';
import { showSearchPanel } from '../../ui/helpers';
import { cssify } from '../../utils/css';
import styles from './search-bar.scss';

@customElement('search-bar')
export default class SeachBar extends LitElement {
	static styles = cssify(styles);

	showSearch() {
		showSearchPanel({
			filter: {
				identities: true,
				games: true,
				chats: true,
				groups: true
			}
		});
	}

	render() {
		return html`
			<div id="base" @click=${this.showSearch.bind(this)}>
				<e-svg id="search-icon" src="material/magnify"></e-svg>
				<p>Search Rivet...</p>
			</div>
		`;
	}
}
