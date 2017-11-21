import { combineReducers } from 'redux';

import { cityNews, cityWeatherInfo, city } from './cityInfoReducer';


/*
 * function that maps each piece of data to the generated state object
 */
export default combineReducers ({
	//cityWeatherInfo : cityWeatherInfo,
	//cityNews : cityNews,
	cityInfo : city
	//cityCurrentTemp : fetchCurrentCityTemp,
});
