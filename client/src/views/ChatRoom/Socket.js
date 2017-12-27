import socketClient from 'socket.io-client';
//import cookie from 'js-cookie';
//let user = cookie.getJSON('user') || {};

let socket;
//,
// ops = {
// 	query: {
// 		token: user.token
// 	}
// };


socket = socketClient ('http://localhost:3000');

export default socket;
