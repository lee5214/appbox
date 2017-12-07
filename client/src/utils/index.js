export function fetchUserLocation () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition (function (position) {
			console.log ('get location in /utils',position.coords.latitude, position.coords.longitude);
		});
	}
}

export function isMacintosh() {
	return navigator.platform.indexOf('Mac') > -1
}
