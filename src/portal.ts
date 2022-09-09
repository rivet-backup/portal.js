import './elements/mod';
import UIRoot from './elements/root/ui-root';
import global from './utils/global';
import logging from './utils/logging';

window.addEventListener('load', async () => {
	// Update loading message
	let loadingElement = document.getElementById('loading-panel');
	let loadingText = document.getElementById('loading-text');

	// Add main UI
	loadingText.innerText = 'Rendering';
	let uiRoot = new UIRoot();
	document.body.appendChild(uiRoot);

	// initiate
	logging.event('Running portal...');
	loadingText.innerText = 'Initiating';
	await global.init();
});
