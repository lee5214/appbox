module.exports = {
  cookieKey: process.env.CI_COOKIE_KEY,
  mongo: { mongoUri: process.env.CI_MONGO_URI },
  google: {
    googleClientID: process.env.CI_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.CI_GOOGLE_CLIENT_SECRET
  },
  facebook: {
    facebookAppID: process.env.CI_FACEBOOK_CLIENT_ID,
    facebookAppSecret: process.env.CI_FACEBOOK_CLIENT_SECRET
  },
  OWM_Key: process.env.CI_OWM_API_KEY,
  NYT_Key: process.env.CI_NYT_API_KEY,
  GoogleGlobalAPI_Key: process.env.CI_GOOGLE_GLOBAL_API_KEY
};
