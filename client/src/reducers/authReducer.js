import { FETCH_USER } from "../actions/fetchUser";

export function user (state = null, action) {
	console.log ('action', action);
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
};
