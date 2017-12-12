import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';

export const fetchUser = () => {
	// if redux thunk see an action returns a function
	// it will call the func with dispatch automaticlly

	return async function (dispatch) {
		const user = await axios.get ('/api/current_user');
		dispatch({
			type: FETCH_USER,
			payload: user.data
		})
	};

	// return function (dispatch) {
	// 	axios.get ('/api/current_user')
	// 		.then (res => {
	// 			dispatch ({
	// 				type : FETCH_USER,
	// 				payload : res,
	// 			});
	// 		});
	// };
};
