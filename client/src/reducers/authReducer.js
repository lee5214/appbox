import { FETCH_CURRENT_USER } from "../actions/user";

export const currentUser = (state = null, action) => {
	console.log ('action', action);
	switch (action.type) {
		case FETCH_CURRENT_USER:
			return action.payload || false;
		default:
			return state;
	}
};
