import { combineReducers } from 'redux';

import { setting } from './settingReducer';

import { city, cityNews, cityWeatherInfo } from './cityInfoReducer';

import { currentUser } from "./authReducer";

import { pubChatMessages } from './chatReducer';

export default combineReducers ({
	setting,
	currentUserInfo : currentUser,
	cityInfo : city,
	chatRoom : combineReducers ({
		pubChatMessages : pubChatMessages,
	}),
});
