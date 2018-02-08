import { FETCH_CITY } from '../actions';

export const city = (state = [], action) => {
	switch (action.type) {
		case FETCH_CITY:
			return [ action.payload, ...state ];
		default:
			return state;
	}
};
