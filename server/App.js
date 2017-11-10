const Express = require( 'express' );

const App = new Express();

App.get( '/', ( req, res ) => {
	console.warn('aaaa');
} );

module.exports = App;
