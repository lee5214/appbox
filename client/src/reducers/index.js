import { combineReducers } from 'redux';

import { cityNews, cityWeatherInfo, city } from './cityInfoReducer';

import {user} from "./authReducer";

import {pubChatMessages} from './chatReducer'
/*
 * function that maps each piece of data to the generated state object
 */
export default combineReducers ({
	//cityWeatherInfo : cityWeatherInfo,
	//cityNews : cityNews,
	cityInfo : city,
	userInfo: user,
	messages : combineReducers({pubChatMessages : pubChatMessages}),
	//cityCurrentTemp : fetchCurrentCityTemp,
});
