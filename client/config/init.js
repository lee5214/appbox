'use strict';

let bodyElement = document.querySelector ('body');
bodyElement.classList.add ('loading');

document.addEventListener ('readystatechange', function () {
	if (document.readyState === 'complete') {

		let bodyElement = document.querySelector ('body');
		let loaderElement = document.querySelector ('#initial-loader');

		bodyElement.classList.add ('loaded');
		setTimeout (function () {
			bodyElement.removeChild (loaderElement);
			bodyElement.classList.remove ('loading', 'loaded');
		}, 200);
	}
});

