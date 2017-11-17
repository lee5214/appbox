export function fetchUserLocation () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition (function (position) {
			console.log (position.coords.latitude, position.coords.longitude);
		});
	}
}

export function isMacintosh() {
	return navigator.platform.indexOf('Mac') > -1
}
