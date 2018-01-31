import axios from 'axios';

// a workaround for production, heroku only alows https, but onpenweathermap provides http, so add
// 'https://cors-anywhere.herokuapp.com/'
let WEATHER_URL;
if (process.env.NODE_ENV === 'production') {
	WEATHER_URL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5';
} else {
	WEATHER_URL = 'http://api.openweathermap.org/data/2.5';
}
const NYT_NEWS_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
// export const FETCH_CITY_WEATHER = 'FETCH_CITY_WEATHER';
// export const FETCH_CITY_NEWS = 'FETCH_CITY_NEWS';
export const FETCH_CITY = 'FETCH_CITY';

// export async function fetchCityWeather (cityName, unit = 'Imperial') {
// 	// forecast 5d/3h
// 	const url1 = `${WEATHER_URL}/forecast?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
// 	// get current weather
// 	const url2 = `${WEATHER_URL}/weather?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
//
// 	const cityInfo = await axios.get (url1);
// 	const cityCurrentTemp = await axios.get (url2);
//
// 	const cityWeather = await {...cityInfo.data, ...cityCurrentTemp.data};
// 	return {
// 		type : FETCH_CITY_WEATHER,
// 		payload : cityWeather,
// 	};
// }
//
// export async function fetchCityNews (cityName) {
// 	const url = `${NYT_NEWS_URL}?api-key=${NYT_Key}&q=${cityName}`;
//
// 	const cityNews = await axios.get (url).then (item => item.data);
// 	return {
// 		type : FETCH_CITY_NEWS,
// 		payload : cityNews,
// 	};
// }


// using redux-promise

// export async function fetchCity (cityName, unit = 'Imperial') {
// 	// forecast 5d/3h
// 	const url1 = `${WEATHER_URL}/forecast?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
// 	// get current weather
// 	const url2 = `${WEATHER_URL}/weather?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
//
// 	const cityInfo = await axios.get (url1);
// 	const cityCurrentTemp = await axios.get (url2);
//
// 	const cityWeather = await {...cityInfo.data, ...cityCurrentTemp.data};
// 	const url = `${NYT_NEWS_URL}?api-key=${NYT_Key}&q=${cityName}`;
//
// 	const cityNews = await axios.get (url).then (item => item.data);
//
// 	return {
// 		type : FETCH_CITY,
// 		payload : {
// 			cityWeather,
// 			cityNews
// 		},
// 	};
// }

// using redux-thunk

// export const fetchCity = (cityName, unit = 'Imperial') => {
// 	// forecast 5d/3h
// 	const forecastURL = `${WEATHER_URL}/forecast?APPID=${keys.OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
// 	// get current weather
// 	const currentURL = `${WEATHER_URL}/weather?APPID=${keys.OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
//
// 	return async function (dispatch) {
// 		const data = await axios.post('/api/city/getCityInfo',cityName)
// 		const cityForecastTemp = await axios.get (forecastURL);
// 		const cityCurrentTemp = await axios.get (currentURL);
//
// 		const url = `${NYT_NEWS_URL}?api-key=${keys.NYT_Key}&q=${cityName}`;
// 		//const cityWeather = await {...cityForecastTemp.data, ...cityCurrentTemp.data};
// 		//const cityNews = await axios.get (url).then (item => item.data);
// 		const cityWeather = await axios.post ('/api/city/getCityWeather', url)
// 		                               .then (res => {
//
// 		                               })
// 		const cityNews = await axios.post ('/api/city/getCityNews', url).then (res => {
//
// 		});
// 		dispatch ({
// 			type : FETCH_CITY,
// 			payload : {
// 				cityWeather,
// 				cityNews,
// 				data
// 			},
// 		});
// 	};
// };

export const fetchCity = (cityName, unit = 'Imperial') => {
	return async function (dispatch) {
		const {cityWeather, cityNews} = await axios.post ('/api/city/getCityInfo', {cityName, unit})
		                                           .then (res => {
			                                           return res.data
			                                           console.log('res.data',res.data)
		                                           })
		                                           .catch (err => {
			                                           console.log ('err', err);
		                                           });
		console.log ('fetch city weather & news =>', cityNews);
		dispatch ({
			type : FETCH_CITY,
			payload : {
				cityWeather,
				cityNews,
			},
		});
	};
};
// TODO city search function complation (add feedback after submit)
