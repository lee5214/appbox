const io = require ('../bin/start').io;
let connectedUsers = [];
let onlineUsers = -1;
module.exports = (socket) => {
	onlineUsers++;
	console.log('online users----',onlineUsers)
	connectedUsers[socket.id] = socket;
	io.emit ('onlineUsersUpdate',onlineUsers);
	console.log ('Server side io starts, socketID----: ', socket.id);

	socket.on ('new user join', (user) => {
		console.log ('user----',user);
		connectedUsers[user.displayName] = user;

		// io.of ('/chatroom').clients ((error, clients) => {
		// 	if (error) {throw error;}
		// 	;
		// 	console.log ('clients--------------', clients); // => [Anw2LatarvGVVXEIAAAD]
		// 	io.emit ('connectedUsers update', clients);
		// });
		//
		// var clients = io.clients ();
		// console.log('clients',clients)
		// TODO need connectedUsers public var
		if (connectedUsers.find ((element) => element === user)) {
			connectedUsers = [user, ...connectedUsers];
		}
		io.emit ('connectedUsers update', connectedUsers);// addUser(connectedUsers,user))
		//console.log ('list  ', connectedUsers);
	});
	socket.on ('send msg', (msg) => {
		console.log ('socket received msg ', msg);
		// socket.emit('receive msg', msg)
		io.emit ('receive msg', msg);// for all users!!!!

	});

	socket.on ('disconnect', () => {
		onlineUsers--;
		console.log('online users----',onlineUsers)
		console.log ('Client disconnected: ',socket.id);
		io.emit ('onlineUsersUpdate',onlineUsers);
	});

	//test
	// socket.on ('msg', (msg) => {
	// 	console.log ('server received msg=>', msg);
	// 	socket.emit ('msg', 'hello from server');
	// 	// io.emit ('msg', 'hello from serve');
	// });
	// socket.on ('change color', (color) => {
	// 	// socket.emit ('change color', color);// for one socket
	// 	io.emit ('change color', color);// for all users!!!!
	// });
	// socket.on ('my other event', function (data) {
	// 	console.log (data);
	// });

	// chatroom
	// io.socket.emit('user join', (user) => {
	//
	// })

};


/*
 emit ：用来发射一个事件或者说触发一个事件，第一个参数为事件名，第二个参数为要发送的数据，第三个参数为回调函数（一般省略，如需对方接受到信息后立即得到确认时，则需要用到回调函数）。
 on ：用来监听一个 emit 发射的事件，第一个参数为要监听的事件名，第二个参数为一个匿名函数用来接收对方发来的数据，该匿名函数的第一个参数为接收的数据，若有第二个参数，则为要返回的函数。

 socket.io 提供了三种默认的事件（客户端和服务器都有）：connect 、message 、disconnect 。
 当与对方建立连接后自动触发 connect 事件，
 当收到对方发来的数据后触发 message 事件（通常为 socket.send() 触发），
 当对方关闭连接后触发 disconnect 事件。

 socket.emit() ：向建立该连接的客户端广播
 socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
 io.emit() ：向所有客户端广播，等同于上面两个的和
 */
const add = (connectedUsers, user) => {
	if (!connectedUsers.find(user)){
		connectedUsers = [user,...connectedUsers]
		return connectedUsers
	}
}

const addUser = (connectedUsers, user) => {
	let newList = Object.assign ({}, user.displayName);
	newList[user.displayName] = user;

	return newList;
};

const removeUser = (connectedUsers, userId) => {
	let newList = Object.assign ({}, connectedUsers);
	delete connectedUsers[userId];
	return newList;
};
