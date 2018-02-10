import axios from 'axios';
import uuid from 'uuid';
import _ from 'lodash';
import {randomAvatarUrl} from 'utils'
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const CREATE_GUEST_USER = 'CREATE_GUEST_USER';

export const fetchCurrentUser = () => {
	// if redux thunk see an action returns a function
	// it will call the func with dispatch automaticlly
	return async function (dispatch) {
		const user = await axios.get ('/api/current_user');
		if(user.data) {
			dispatch ({
				type : FETCH_CURRENT_USER,
				payload : user.data,
			});
		} else {
			const guest = {
				guest: true,
				_id: uuid.v4(),
				local:{
					avatar: randomAvatarUrl(),
					displayName: `Guest-${uuid.v4().split('-').pop()}`
				}
			}
			dispatch({
				type : CREATE_GUEST_USER,
				payload: guest
			})
		}
	};
};


// export const createGuestUser = () => {

	// return function(dispatch) {
	// 	const ran =_.random (1, 16);
	// 	const guest = {
	// 		guest: true,
	// 		_id: uuid.v4(),
	// 		local:{
	// 			avatar: `/img/avatars/guest-${ran}.png`,
	// 			displayName: `guest-${uuid.v4().split('-').pop()}`
	// 		}
	// 	}
	// 	dispatch({
	// 		type : CREATE_GUEST_USER,
	// 		payload: guest
	// 	})
	// }
// }
