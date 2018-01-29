import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
// redux devtool
import { composeWithDevTools } from 'redux-devtools-extension';
// Styles
// Import Font Awesome Icons Set
//import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css';
// Temp fix for reactstrap
// import './scss/core/_dropdown-menu-right.scss'
// Containers
import App from './containers/AppContainer';
import reducers from './reducers';
// Views
import Login from './views/Pages/Login/';
import Register from './views/Pages/Register/';
import Page404 from './views/Pages/Page404/';
import Page500 from './views/Pages/Page500/';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers(
// 	applyMiddleware (ReduxThunk)
// ))

//const store = createStore (reducers, composeWithDevTools (
//	applyMiddleware (ReduxThunk)));
// if (process.env.NODE_ENV !== 'production') {
// 	let createStoreWithMiddleware = applyMiddleware (ReduxThunk) (createStore);
// 	let store = createStoreWithMiddleware (reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ ());
// } else {
//	let store = createStore (reducers, applyMiddleware (ReduxThunk));
// }
const store = createStore (reducers, composeWithDevTools (
	applyMiddleware (ReduxThunk))
);

ReactDOM.render (
	<Provider store={ store }>
		{ /*<HashRouter> is for static website, <BrowserRouter> is more for dynamic*/ }
		<BrowserRouter>
			<Switch>
				<Route exact path="/login" name="Login Page" component={ Login }/>
				<Route exact path="/register" name="Register Page"
				       component={ Register }/>
				<Route exact path="/404" name="Page 404" component={ Page404 }/>
				<Route exact path="/500" name="Page 500" component={ Page500 }/>
				<Route path="/" name="Home" component={ App }/>
			</Switch>
		</BrowserRouter>
	</Provider>
	, document.getElementById ('root'),
)
