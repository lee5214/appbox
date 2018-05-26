AppBox
==============
![Build Status](https://travis-ci.org/lee5214/appbox.svg?branch=master)
[![License](http://img.shields.io/badge/license-mit-blue.svg?style=flat-square)](https://github.com/lee5214/appbox/master/LICENSE)



### Description
This is a full-stack project I created as my all-in-one SPA & website for practice and daily use


### Demo
https://cong-li.com


### Credits
>Client
>> `React, Redux, Webpack`

>Server
>> `Express, Node, Gooeld Cloud, Heroku, MongoDB, Firebase, Travis CI`

### Details
```
author: Cong Li
email: cong-li@cong-li.com
```

### Run on local

All keys are git-ignored and saved as node variables for security reason.
<br/>
To make it run, you need to create your own `/config/credentials/devKey.js`
```
module.exports = {
	'cookieKey' : 'anyString',
	'mongo' : {
		'mongoUri' : 'mlabUri',
	},
	'google' : {
		'googleClientID' : 'googleID(google plus enable)',
		'googleClientSecret' : 'secret',
	},
	'facebook' : {
		'facebookAppID' : 'facebookID',
		'facebookAppSecret' : 'secret',
	},
	'OpenWeatherMap_Key' : 'owm api',
	'NYT_Key' : 'nyt api',
	'GoogleGlobalAPI_Key' : 'google global key',
};
```
Then
```javascript
npm run dev
```
frontend (react) server: localhost:3000
<br />
backend (express) server: localhost: 4000

### Log

```diff
+ Three.js
+ svg animation
+ SSL
+ firebase
+ google cloud
+ socket.io
+ redux-thunk
+ styled components
+ css modules
+ scss
- socket.io
- materialUI
```
