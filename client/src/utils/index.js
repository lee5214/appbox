export const fetchUserLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition (function (position) {
			console.log ('get location in /utils', position.coords.latitude, position.coords.longitude);
		});
	}
};

export const isMacintosh = () => {
	return navigator.platform.indexOf ('Mac') > -1;
};

export const urlPrefix = (url) => {
	let prefix = 'http://';
	if (url.substr (0, prefix.length) !== prefix) {
		url = prefix + url;
	}
	return url;
};
