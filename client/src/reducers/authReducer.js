import { FETCH_CURRENT_USER } from "../actions/user";
import { CREATE_GUEST_USER} from "../actions/user";

export const currentUser = (state = null, action) => {
	switch (action.type) {
		case FETCH_CURRENT_USER:
			return action.payload;
		case CREATE_GUEST_USER:
			return action.payload
		default:
			return state;
	}
};
