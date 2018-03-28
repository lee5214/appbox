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
const cors = require ('cors');
const graphqlHTTP = require ('express-graphql');
const {buildSchema} = require ('graphql');
// create variable also export it for other file(socketManager)
// const io = module.exports.io = require ('socket.io').listen(server,{'transports' : ['polling']}); //(server);
const socketManager = require ('../services/socketManager');
const PORT = process.env.PORT || 4000;
const _debug = require ('debug');
const yes = require ('yes-https');

// disable socket.io
// io.on ('connection', socketManager);
// require ('../services/socketManager') (server);

//  model & mongoose
require ('../models/Users_Model');
require ('../models/SecretLinks_Model');
mongoose.connect (keys.mongo.mongoUri);

// passport
require ('../services/passport') ();

/*
 * ---- middleware section ----
 */

/*
 * ---- graphql ----
 */
let schema = buildSchema(`
	type Query{
		hello: String
	}
`)
const root = {hello:()=>'hi world'}
app.use('/graphql',graphqlHTTP({
	schema:schema,
	rootValue: root,
	graphql: true,
}))
// requests go through middleware before route handlers

app.use (cors ());
app.use (bodyParser.json ());
//  cookie
app.use (
	cookieSession ({
		maxAge : 30 * 24 * 60 * 60 * 1000,// 30 days
		keys : [ keys.cookieKey ],
	}),
);
// must be before authRoutes
app.use (passport.initialize ());
app.use (passport.session ());

/*
 * ---- route section ----
 */

require ('../routes/authRoutes') (app);
require ('../routes/secretLinkRoutes') (app);
require ('../routes/cityRoutes') (app);
require ('../routes/generalRoutes') (app);

// error route handler

/*app.use (function (req, res, next) {
 let err = new Error ('Not Found');
 err.status = 404;
 res.redirect('/#/404')
 //next (err);
 });

 if (process.env.NODE_ENV !== 'production') {
 app.use (function (err, req, res, next) {
 res.status (err.status || 500);
 res.render ('error', {
 message : err.message,
 error : err,
 });
 });
 }

 app.use (function (err, req, res, next) {
 res.status (err.status || 500);
 res.send ('error', {
 message : err.message,
 });
 });*/

server.listen (PORT);
console.log ('node services is running on port:', PORT);

//if (process.env.NODE_ENV === 'production') {
	//if (process.env.NODE_ENV === 'production') {
	app.use (Express.static ('client/build'));

// force naked domain redirect to SSL
	app.use (yes ());
	app.get ('*', (req, res) => {
		res.sendFile (path.resolve (__dirname, '../client/build/index.html'))
	});
//}
//}
