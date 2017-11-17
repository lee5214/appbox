import { combineReducers } from 'redux';

import redu1 from './fetchData';
import { cityWeather, fetchCurrentCityTemp } from './cityWeatherReducer';


/*
 * function that maps each piece of data to the generated state object
 */
export default combineReducers ({
	cityInfo : cityWeather,
	//cityCurrentTemp : fetchCurrentCityTemp,
});
