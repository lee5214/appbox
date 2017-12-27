import axios from 'axios';

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';

export const fetchCurrentUser = () => {
	// if redux thunk see an action returns a function
	// it will call the func with dispatch automaticlly

	return async function (dispatch) {
		const user = await axios.get ('/api/current_user');
		dispatch ({
			type : FETCH_CURRENT_USER,
			payload : user.data,
		});
	};
};
