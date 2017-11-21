import { NYT_Key, OpenWeatherMap_Key } from 'config/API_keys';
import axios from 'axios';

const WEATHER_URL = 'http://api.openweathermap.org/data/2.5';
const NYT_NEWS_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
export const FETCH_CITY_WEATHER = 'FETCH_CITY_WEATHER';
export const FETCH_CITY_NEWS = 'FETCH_CITY_NEWS';
export const FETCH_CITY = 'FETCH_CITY';

export async function fetchCityWeather (cityName, unit = 'Imperial') {
	// forecast 5d/3h
	const url1 = `${WEATHER_URL}/forecast?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
	// get current weather
	const url2 = `${WEATHER_URL}/weather?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;

	const cityInfo = await axios.get (url1);
	const cityCurrentTemp = await axios.get (url2);

	const cityWeather = await {...cityInfo.data, ...cityCurrentTemp.data};
	return {
		type : FETCH_CITY_WEATHER,
		payload : cityWeather,
	};
}

export async function fetchCityNews (cityName) {
	const url = `${NYT_NEWS_URL}?api-key=${NYT_Key}&q=${cityName}`;

	const cityNews = await axios.get (url).then (item => item.data);
	return {
		type : FETCH_CITY_NEWS,
		payload : cityNews,
	};
}

export async function fetchCity (cityName, unit = 'Imperial') {
	// forecast 5d/3h
	const url1 = `${WEATHER_URL}/forecast?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
	// get current weather
	const url2 = `${WEATHER_URL}/weather?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;

	const cityInfo = await axios.get (url1);
	const cityCurrentTemp = await axios.get (url2);

	const cityWeather = await {...cityInfo.data, ...cityCurrentTemp.data};
	const url = `${NYT_NEWS_URL}?api-key=${NYT_Key}&q=${cityName}`;

	const cityNews = await axios.get (url).then (item => item.data);

	return {
		type : FETCH_CITY,
		payload : {
			cityWeather,
			cityNews
		},
	};
}

//TODO city search function complation (add feedback after submit)
