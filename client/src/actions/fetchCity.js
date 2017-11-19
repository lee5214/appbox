import { OpenWeatherMap_Key } from '../config/API_keys';
import axios from 'axios';

const ROOT_URL = 'http://api.openweathermap.org/data/2.5';

export const FETCH_CITYINFO = 'FETCH_CITYINFO';
export const FETCH_CITY_CURRENT_TEMP = 'FETCH_CITY_CURRENT_TEMP';

export async function fetchCity (cityName, unit = 'Imperial') {
	// forecast 5d/3h
	const url1 = `${ROOT_URL}/forecast?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
	// get current weather
	const url2 = `${ROOT_URL}/weather?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;

	const cityInfo = await axios.get (url1);
	const cityCurrentTemp = await axios.get (url2);

	const request = await {...cityInfo.data,...cityCurrentTemp.data}

	return {
		type : FETCH_CITYINFO,
		payload : request,
	};
}

export async function fetchCurrentCityTemp (cityName, unit = 'metric') {
	const url = `${ROOT_URL}/weather?APPID=${OpenWeatherMap_Key}&q=${cityName}&units=${unit}`;
	const request = await axios.get (url);
	console.log ('actions/fetchCityCurrentTemp =>', request);
	return {
		type : FETCH_CITY_CURRENT_TEMP,
		payload : request,
	};
}
