
var ioRoutes = (server) => {

	var io = require ('socket.io') (server);

	io.on ('connection', function (client) {
		console.log ('io starts');
		client.on ('msg', msg => {
			console.log ('server received msg=>', msg);
			client.emit ('msg', 'hello from server');
			io.sockets.emit ('msg', 'hello from serve')
		})
		client.on ('change color', (color) => {
			console.log ('io receive message')
			client.emit ('change color', color)//for one client
			io.sockets.emit ('change color', color)//for all users!!!!
		})
		client.emit ('news', {hello : 'world'});
		client.on ('my other event', function (data) {
			console.log (data);
		});
		client.on ("disconnect", () => console.log ("Client disconnected"));
	});
}

module.exports = ioRoutes
