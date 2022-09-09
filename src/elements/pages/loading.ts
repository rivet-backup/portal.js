import { LitElement, html, customElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { cssify } from '../../utils/css';
import styles from './loading.scss';
import global from '../../utils/global';

@customElement('page-loading')
export default class LoadingPage extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	text: String;

	@property({ type: Boolean })
	error: boolean = false;

	render() {
		return html`
			<div id="base" class=${classMap({error: this.error})}>
				<e-svg id="logo" src="logo/logo-small" preserve></e-svg>
				<h1 id="text">${this.text}</h1>
			</div>
		`;
	}
}
