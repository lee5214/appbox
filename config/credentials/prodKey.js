module.exports = {
	// googleClientID : process.env.GOOGLE_CLIENT_ID,
	// googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
	// mongoUri : process.env.MONGO_URI,
	// cookieKey : process.env.COOKIE_KEY,

	// TODO fix env variable

	'cookieKey' : process.env.COOKIE_KEY,
	'mongo' : {
		'dev' : {
			'mongoUri' : process.env.MONGO_URI,
		},
	},
	'google' : {
		'googleClientID' : process.env.GOOGLE_CLIENT_ID,
		'googleClientSecret' : process.env.GOOGLE_CLIENT_SECRET,
	},
	'facebook' : {
		'facebookAppID' : process.env.FACEBOOK_CLIENT_ID,
		'facebookAppSecret' : process.env.FACEBOOK_CLIENT_SECRET,
	},
};

