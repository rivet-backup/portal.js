import { LitElement, html, customElement, property, queryAll, query } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import styles from './game-sites.scss';
import * as cloud from '@rivet-gg/cloud';
import { responses } from '../../../routes';
import { cssify } from '../../../utils/css';

@customElement('page-dev-game-sites')
export default class DevGameNamespace extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	render() {
		return html`
			<div id="base">
				<dev-cdn-sites ?uploadable=${true} .game=${this.game}></dev-cdn-sites>
			</div>
		`;
	}
}
