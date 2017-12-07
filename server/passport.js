const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20');
const mongoose = require ('mongoose');
// special import style in mongoose in case you import multiple models
// this schema is defined in /models
const User = mongoose.model ('users');

module.exports = (keys) => {
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
				clientID : keys.googleClientID,
				clientSecret : keys.googleClientSecret,
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
						googleID : profile.id,
						email : profile.emails[0].value,
						photo : profile.photos[0].value,
						language : profile._json.language,
						img : profile._json.image.url,
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
};
