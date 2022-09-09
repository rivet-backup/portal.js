import { showAlert } from '../ui/helpers';
import { html } from 'lit-element';

let logging = {
	debug(...data: any[]) {
		console.debug(...data);
	},

	data(title: string, ...data: any[]) {
		console.log(`%c${title}`, 'font-weight: bold; color: #39cec5;', ...data);
	},

	event(title: string, ...data: any[]) {
		console.log(`%c${title}`, 'font-weight: bold; color: #e64670;', ...data);
	},

	net(context: string, ...data: any[]) {
		console.log(`%c${context}`, 'font-weight: bold; color: #737373;', ...data);
	},

	warn(title: string, ...data: any[]) {
		console.warn(`%c${title}`, 'font-weight: bold; color: dark-orange;', ...data);
	},

	error(title: string, ...data: any[]) {
		// Debug alert panel
		if (localStorage.DEBUG_ALERT_ERROR) {
			showAlert(`Internal Error: ${title}`, html`${data.join(' ~~~ ')}`);
		}

		console.error(`%c${title}`, 'font-weight: bold;', ...data);
	}
};

export default logging;
