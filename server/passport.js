
const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20');
const keys = require ('../config/credentials');

passport.use (
	new GoogleStrategy (
		{
			clientID : keys.googleClientID,
			clientSecret : keys.googleClientSecret,
			callbackURL : '/auth/google/callback',
		},
		(accessToken,refreshToken,profile,done) => {
			console.log ('accesstoken', accessToken);
			console.log ('refreshtoken', refreshToken);
			console.log ('profile', profile);

		},
	),
);
