// const App = require('../server/App.js');
// const io = require('socket.io');
//
// const PORT = process.env.PORT || 4000;
//
// const server = App.listen(PORT, function(){
// 	console.log('server listen on port '+PORT)
// });
//
// io.listen(server);

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 4000;
server.listen (PORT);
console.log('node server is running on port:',PORT)
app.get ('/', function (req, res) {
	res.send('welcome');
});

io.on ('connection', function (client) {
	console.log('io starts');
	client.on('msg',msg => {
		console.log('server received msg=>',msg);
		client.emit ('msg','hello from server');
		io.sockets.emit('msg','hello from serve2')
	})
	client.on('change color', (color) => {
		console.log('io receive message')
		client.emit('change color',color)//for one client
		io.sockets.emit('change color', color)//for all users!!!!
	})
	client.emit ('news', {hello : 'world'});
	client.on ('my other event', function (data) {
		console.log (data);
	});
	client.on("disconnect", () => console.log("Client disconnected"));
});

