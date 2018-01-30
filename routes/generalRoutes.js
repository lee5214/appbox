module.exports = (app) => {
	app.get ('/welcome', (req, res) => {
		res.send ('welcome');
	});
	app.post('/api/validateCityName', (req, res) => {
	})
};
// TODO url-regex
