import { combineReducers } from 'redux';

import { cityNews, cityWeatherInfo, city } from './cityInfoReducer';

import {currentUser} from "./authReducer";

import {pubChatMessages} from './chatReducer'
/*
 * function that maps each piece of data to the generated state object
 */
export default combineReducers ({
	//cityWeatherInfo : cityWeatherInfo,
	//cityNews : cityNews,
	cityInfo : city,
	currentUserInfo: currentUser,
	chatRoom : combineReducers({
		pubChatMessages : pubChatMessages,
		//allUsers : pubChatUsers,
	}),
	//cityCurrentTemp : fetchCurrentCityTemp,
});
