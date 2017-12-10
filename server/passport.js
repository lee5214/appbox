const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20');
const FacebookStrategy = require ('passport-facebook');
const mongoose = require ('mongoose');
const keys = require ('../config/credentials');
// special import style in mongoose in case you import multiple models
// this schema is defined in /models
const User = mongoose.model ('users');

module.exports = () => {
	// user here is either existingUser or user in the promises below
	// oauth's purpose is allowing someone to sign in
	// then I use its own id saved in db
	passport.serializeUser ((user, done) => {
		// this is id in db
		// for multiple social accounts sign in
		done (null, user.id);
	});
	passport.deserializeUser ((id, done) => {
		User.findById (id)
			.then ((user) => {
				done (null, user);
			});
	});

	passport.use (
		new GoogleStrategy (
			{
				clientID : keys.google.googleClientID,
				clientSecret : keys.google.googleClientSecret,
				callbackURL : '/auth/google/callback',
			},
			// refactor promise using async/await
			async (accessToken, refreshToken, profile, done) => {
				console.log ('profile=>', profile);
				const existingUser = await User.findOne ({googleID : profile.id});
				if (existingUser) {
					// (error, user record)
					done (null, existingUser);
				}
				else {
					const user = await new User ({
						local : {
							email : profile.emails[0].value,
							displayName : profile.displayName,
							avatar : profile.photos[0].value,
						},
						google : profile._json,
					}).save ();
					// call done() after user is saved in db
					// (error, user record)
					done (null, user);

				}

				// this returns a promise
				// User.findOne ({googleID : profile.id})
				// 	.then ((existingUser) => {
				// 		// if no existing user found, insert new record
				// 		if (existingUser) {
				// 			// (error, user record)
				// 			done (null, existingUser);
				// 		}
				// 		else {
				// 			new User ({googleID : profile.id,})
				// 				.save ()
				// 				// call done() after user is saved in db
				// 				.then ((user) => {
				// 					// (error, user record)
				// 					done (null, user);
				// 				});
				// 		}
				// 	});
			},
		),
	);

	passport.use (
		new FacebookStrategy (
			{
				clientID : keys.facebook.facebookAppID,
				clientSecret : keys.facebook.facebookAppSecret,
				callbackURL : "/auth/facebook/callback",
				profileFields : ['id', 'birthday', 'email', 'first_name', 'picture',
					'cover',
					'locale',
					'timezone',
					'updated_time',
			]},
			async (accessToken, refreshToken, profile, done) => {
				console.log ('profile=>', profile);
				const existingUser = await User.findOne ({facebookID : profile.id});
				if (existingUser) {
					done (null, existingUser);
				}
				else {
					const user = await new User ({
						local : {
							email : profile.emails[0].value,
							//firstName : profile.first_name,
							displayName : profile.displayName || profile.first_name,
							avatar : profile.photos[0].value || '',
							language : profile._json.local,
						},
						facebook : profile._json,
					}).save ();
					done (null, user);
				}
			},
		));
};
