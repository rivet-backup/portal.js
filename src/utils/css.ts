import { CSSResult, unsafeCSS } from 'lit-element';

export function cssify(styleSheet: string): CSSResult {
	return unsafeCSS(styleSheet);
}
