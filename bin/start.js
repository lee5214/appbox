const app = require ('express') ();
const server = require ('http').Server (app);
const mongoose = require ('mongoose');
const passport = require ('passport');
const keys = require ('../config/credentials');
const bodyParser = require ('body-parser');
const cookieSession = require ('cookie-session');

app.use (bodyParser.json ());
// socket.io
require ('../server/socket') (server);

//  mongoose
require ('../models/User');
mongoose.connect (keys.mongoUri);

// passport
require ('../server/passport') (keys);

// requests go through middleware before route handlers
//  cookie
app.use (
	cookieSession ({
		maxAge : 30 * 24 * 60 * 60 * 1000,// 30 days
		keys : [keys.cookieKey],
	}),
);
// must be before authRoutes
app.use (passport.initialize ());
app.use (passport.session ());

// app routes
require ('../routes/generalRoutes') (app);
require ('../routes/authRoutes') (app);


const PORT = process.env.PORT || 4000;
server.listen (PORT);
console.log ('node server is running on port:', PORT);



