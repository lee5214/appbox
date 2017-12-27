export const SEND_PUB_CHAT_MSGS = 'SEND_PUB_CHAT_MSGS';
// export const fetchPublicChatMessages = () => {
// 	return async function (dispatch) {
// 		//const user = await axios.get ('/api/current_user');
//
// 		dispatch({
// 			type: FETCH_PUB_CHAT_MSGS,
// 			payload: user.data
// 		})
// 	};
// };
export const sendPubChatMsgs = (msg) => {
	return async function (dispatch) {
		// const user = await axios.get ('/api/current_user');
		dispatch ({
			type : SEND_PUB_CHAT_MSGS,
			payload : msg,
		});
	};
};
