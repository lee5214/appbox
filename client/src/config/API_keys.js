// import prodKeys from './prodKeys';
// import devKeys from './devKeys';

let keys;
if (process.env.NODE_ENV === 'production') {
	//keys = require('./prodKeys')
	keys = {
		'OpenWeatherMap_Key' : process.env.OWM_API_KEY,
		'NYT_Key' : process.env.NYT_API_KEY,
		'GoogleGlobalAPI_Key' : process.env.GOOGLE_GLOBAL_API_KEY,
	};
} else {
	//keys = require('./devKeys')
	keys = {
		'OpenWeatherMap_Key' : '58bc6bdbc6285ac512cb870c3a126018',
		'NYT_Key' : '7b3752510c8d426d9182b1beb2f507e3',
		'GoogleGlobalAPI_Key' : 'AIzaSyCLCYRWrzT5cfMKwnSbKNYIBcZKw14dRwM',
	};
}

export default keys;
