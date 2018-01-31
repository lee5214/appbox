module.exports = {
	'cookieKey' : process.env.COOKIE_KEY,
	'mongo' : {
		'mongoUri' : process.env.MONGO_URI,
	},
	'google' : {
		'googleClientID' : process.env.GOOGLE_CLIENT_ID,
		'googleClientSecret' : process.env.GOOGLE_CLIENT_SECRET,
	},
	'facebook' : {
		'facebookAppID' : process.env.FACEBOOK_CLIENT_ID,
		'facebookAppSecret' : process.env.FACEBOOK_CLIENT_SECRET,
	},
	'OpenWeatherMap_Key' : process.env.OWM_API_KEY,
	'NYT_Key' : process.env.NYT_API_KEY,
	'GoogleGlobalAPI_Key' : process.env.GOOGLE_GLOBAL_API_KEY,
};

