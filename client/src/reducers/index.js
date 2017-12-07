import { combineReducers } from 'redux';

import { cityNews, cityWeatherInfo, city } from './cityInfoReducer';

import {user} from "./authReducer";
/*
 * function that maps each piece of data to the generated state object
 */
export default combineReducers ({
	//cityWeatherInfo : cityWeatherInfo,
	//cityNews : cityNews,
	cityInfo : city,
	userInfo: user,
	//cityCurrentTemp : fetchCurrentCityTemp,
});
