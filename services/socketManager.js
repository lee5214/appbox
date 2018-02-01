const io = require ('../bin/start').io;
let connectedUsers = new Map();
let onlineUsers = 0;
module.exports = (socket) => {
	onlineUsers++;
	io.emit ('onlineUsersUpdate',onlineUsers);

	socket.on ('new user join', (user) => {
		console.log('user connected----',user.displayName)
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user
		io.emit('userList update', connectedUsers)
	});
	socket.on ('send msg', (msg) => {
		io.emit ('receive msg', msg);

	});
	socket.on ('disconnect', () => {
		if ('user' in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.userId)
			console.log('user disconnected----', socket.user.displayName)
			io.emit('userList update', connectedUsers)
		}
		// onlineUsers--;
		// console.log ('Client disconnected----', socket.UID);
		// if (connectedUsers.find((element) => element === socket.UID)){
		// 	let index = connectedUsers.valueOf(socket.UID);
		// 	connectedUsers.splice(index,1)
		// }
		// console.log('disconn',connectedUsers)
		//
		//
		// io.emit ('userList update',connectedUsers);
	});

	//test
	// socket.on ('msg', (msg) => {
	// 	console.log ('services received msg=>', msg);
	// 	socket.emit ('msg', 'hello from services');
	// 	// io.emit ('msg', 'hello from serve');
	// });
	// socket.on ('change color', (color) => {
	// 	// socket.emit ('change color', color);// for one socket
	// 	io.emit ('change color', color);// for all users!!!!
	// });
	// socket.on ('my other event', function (data) {
	// 	console.log (data);
	// });
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

function addUser(list, user){
	// object.assign(target, ...sources) is a clone method for object
	// let newList = Object.assign({}, list)
	let newList = {...list}
	newList[user.userId] = user
	return newList
}

const removeUser = (list, userId) => {
	let newList = {...list}
	delete newList[userId];
	return newList;
};
