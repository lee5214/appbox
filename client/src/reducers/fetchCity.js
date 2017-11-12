import { FETCH_CITY_CURRENT_TEMP, FETCH_CITYINFO } from '../actions/fetchCity';

export function fetchCity (state = [], action) {
	switch (action.type) {
		case FETCH_CITYINFO:
			return [action.payload.data, ...state];
		default:
			return state;

	}
}

export function fetchCurrentCityTemp (state = null, action) {
	switch (action.type) {
		case FETCH_CITY_CURRENT_TEMP:
			return action.payload.data;
		default:
			return state;
	}
}
