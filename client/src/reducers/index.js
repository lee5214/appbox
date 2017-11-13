import { combineReducers } from 'redux';

import redu1 from './fetchData';
import { fetchCityInfo, fetchCurrentCityTemp } from './fetchCity';


/*
 * function that maps each piece of data to the generated state object
 */
export default combineReducers ({
	test : redu1,
	cityInfo : fetchCityInfo,
	//cityCurrentTemp : fetchCurrentCityTemp,
});
