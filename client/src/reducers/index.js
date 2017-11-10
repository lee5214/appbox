import { combineReducers } from 'redux';

import redu1 from './fetchData';

/*
 * function that maps each piece of data to the generated state object
 */
export default combineReducers ({
	test : redu1,
});
