const cookieSession = require('cookie-session');
const passport = require ('passport');
const keys = require ('../config/credentials');

module.exports = (app) => {
	app.use (
		cookieSession ({
			maxAge : 30 * 24 * 60 * 60 * 1000,// 30 days
			keys : [keys.cookieKey],
		}),
	);
	// must be before authRoutes
	app.use (passport.initialize ());
	app.use (passport.session ());
};