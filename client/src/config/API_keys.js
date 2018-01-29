// import prodKeys from './prodKeys';
// import devKeys from './devKeys';

let keys;

if (process.env.NODE_ENV === 'production') {
	keys = {
		'OpenWeatherMap_Key' : '58bc6bdbc6285ac512cb870c3a126018',
		'NYT_Key' : '7b3752510c8d426d9182b1beb2f507e3',
		'GoogleGlobalAPI_Key' : 'AIzaSyCLCYRWrzT5cfMKwnSbKNYIBcZKw14dRwM',
	};
} else {
	keys = {
		'OpenWeatherMap_Key' : '58bc6bdbc6285ac512cb870c3a126018',
		'NYT_Key' : '7b3752510c8d426d9182b1beb2f507e3',
		'GoogleGlobalAPI_Key' : 'AIzaSyCLCYRWrzT5cfMKwnSbKNYIBcZKw14dRwM',
	};
}

export default keys;
