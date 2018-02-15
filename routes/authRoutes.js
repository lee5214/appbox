const passport = require ('passport');
const mongoose = require ('mongoose');
const requireLogin = require ('../middleware/requireLogin');
const Users_Model = mongoose.model ('Users_Model');

module.exports = (app) => {

	/*
	 * utils
	 */
	app.get ('/api/current_user', (req, res) => {
		// for cookie-session test: res.send(req.session)
		res.send (req.user);
	});
	app.get ('/api/all_registered_users', (req, res) => {
		Users_Model.find ({}, (err, users) => {
			console.log ('aa');
			res.send (users);
		});
	});
	app.get ('/api/all_google_users', (req, res) => {
		Users_Model.find ({'google' : {$exists : true}}, (err, users) => {
			res.send (users);
		});
	});
	app.get ('/api/all_facebook_users', (req, res) => {
		Users_Model.find ({'facebook' : {$exists : true}}, (err, users) => {
			res.send (users);
		});
	});

	app.get ('/api/logout', (req, res) => {
		req.logout ();
		res.redirect ('/');
	});

	/*
	 * local
	 */
	app.post ('/auth/local_register',
		passport.authenticate ('local-register'),
		(req, res) => {
			res.send ({redirect : '/'});
		},
	);
	app.post ('/auth/local_login',
		// IMPORTANT ajax call will not redirect the url, so I send the url back to front end, /Login handler takes it
		passport.authenticate ('local-login'),
		(req, res) => {
			res.send ({redirect : '/'});
		},
	);

	/*
	 * google
	 */
	app.get (
		'/auth/google',
		passport.authenticate (
			'google',
			{scope : [ 'profile', 'email' ], prompt : 'select_account'},
		),
	);
	// passport is a middleware, this shows how to  use middleware in only one route
	app.get (
		'/auth/google/callback',
		passport.authenticate ('google', {failureRedirect : '/login'}),
		(req, res) => {
			// const backURL = req.header ('Referer') || '/';
			res.redirect ('/');
		},
	);

	/*
	 * facebook
	 */
	app.get (
		'/auth/facebook',
		passport.authenticate (
			'facebook',
			{scope : [ 'public_profile', 'email' ]},
		),
	);
	app.get (
		'/auth/facebook/callback',
		passport.authenticate ('facebook', {successRedirect : '/', failureRedirect : '/login'}));
};
