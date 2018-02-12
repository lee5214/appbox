AppBox
==============
![Build Status](https://travis-ci.org/lee5214/appbox.svg?branch=master)
[![License](http://img.shields.io/badge/license-mit-blue.svg?style=flat-square)](https://github.com/lee5214/appbox/master/LICENSE)


###Description
This is an all in one project I created as my SPA & website & toolkit 


### Demo
my personal website : https://cong-li.com


### Credits
    
    Express
    Node
>Client
>> `React, Redux`

>Server
>> `Express, Node, Firebase, Gooeld Cloud, MongoDB`


|Author|Cong Li|
|---|---
|email|cong-li@cong-li.com
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


### Run on local
```javascript
npm run dev
```
default frontend react server: localhost:3000
default backend express server: localhost: 4000


### Build steps in production

```javascript
>> git push
>> go through CI
>> CI deploy onto google app engine & heroku
```

```diff
+ firebase
- socket.io
```
