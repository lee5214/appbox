const Express = require ('express');
const app = new Express ();
const http = require ('http');
const mongoose = require ('mongoose');
const passport = require ('passport');
const keys = require ('../config/credentials');
const bodyParser = require ('body-parser');
const cookieSession = require ('cookie-session');
const path = require ('path');
const server = http.Server (app);
// create variable also export it for other file(socketManager)
const io = module.exports.io = require ('socket.io')(server);
const socketManager = require('../server/socketManager');
const PORT = process.env.PORT || 4000;
const _debug = require('debug')

// const debug = _debug('app:bin:server')
// debug(`Server is now running at http://host:${PORT}.`)
// debug(`Server accessible via localhost:${PORT} if you are using the project defaults.`)


io.on ('connection', socketManager);
server.listen (PORT, () => {
	console.log ('Connected to Port: ', PORT);
});
console.log ('node server is running on port:', PORT);

// app.get('/', function (req, res) {
// 	res.sendfile(__dirname + '/index.html');
// });

// socket.io
require ('../server/socketManager') (server);
//  mongoose
require ('../models/User');
mongoose.connect (keys.mongo.dev.mongoUri);

// passport
require ('../server/passport') ();


/*
 * ---- middleware section ----
 */
require('../middleware')(app)
// requests go through middleware before route handlers

// app.use (bodyParser.json ());
// //  cookie
// app.use (
// 	cookieSession ({
// 		maxAge : 30 * 24 * 60 * 60 * 1000,// 30 days
// 		keys : [keys.cookieKey],
// 	}),
// );
// // must be before authRoutes
// app.use (passport.initialize ());
// app.use (passport.session ());
// app.use (function(req,res,next){
// 	console.log('time',Date.now())
// 	next()
// });

// later refactor
// require('../middleware')(app,cookieSession,passport,keys)


/*
 * ---- route section ----
 */
// app routes
require ('../routes/generalRoutes') (app);
require ('../routes/authRoutes') (app);
if (process.env.NODE_ENV === 'production') {
	app.use (Express.static ('client/build'));

	app.get ('*', (req, res) => {
		res.sendFile (path.resolve (__dirname, 'client', 'build', 'index.html'));
	});
}




