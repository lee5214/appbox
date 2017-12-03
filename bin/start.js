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

const app = require ('express') ();
const server = require ('http').Server (app);

// general app routes
require('../routes/generalRoutes')(app);
// import socket routes
require ('../routes/ioRoutes') (server);

const PORT = process.env.PORT || 4000;

server.listen (PORT);

console.log ('node server is running on port:', PORT);







