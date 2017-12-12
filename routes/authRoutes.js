const passport = require ('passport');

module.exports = (app) => {

	/*
	 * google
	 */
	app.get (
		'/auth/google',
		passport.authenticate (
			'google',
			{scope : ['profile', 'email'], prompt : 'select_account'},
		),
	);

	// passport is a middleware, this shows how to  use middleware in only one route
	app.get (
		'/auth/google/callback',
		passport.authenticate ('google'),
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
			{scope : ['public_profile', 'email']},
		),
	);

	app.get (
		'/auth/facebook/callback',
		passport.authenticate ('facebook', {successRedirect : '/', failureRedirect : '/login'}));

	/*
	 * utils
	 */
	app.get ('/api/current_user', (req, res) => {
		// for cookie-session test: res.send(req.session)
		res.send (req.user);
	});

	app.get ('/api/logout', (req, res) => {
		req.logout ();
		// res.redirect('/')
		// res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0,
		// pre-check=0');
		res.redirect ('back');
	});
};
