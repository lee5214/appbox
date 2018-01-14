const mongoose = require ('mongoose');
const requireLogin = require ('../middleware/requireLogin');
const SecretLinks_Model = mongoose.model ('SecretLinks_Model');

module.exports = (app) => {
	app.post ('/api/secretLinks/generateLink', requireLogin, (req, res, next) => {
		console.log ('services received', req.body);
		const {origionalUrl, userId} = req.body;
		const link = new SecretLinks_Model ({
			// userId : String,
			// origionalUrl : String,
			// targetUrl : String,
			// clickCounter : {type : Number, default : 0, require : true},
			// dateCreated : Date,
			// dateLastVisited : Date,
			userId,
			origionalUrl,
			dateCreated : Date.now (),
		});
		link.save ((err) => {
			if (err) {
				console.log ('db err =>', err);
			}
		});
		res.json (link);
		next ();
	});

	app.get ('/api/secretLinks/publicLinksList', async (req, res, next) => {
		await SecretLinks_Model.find ((err, docs) => {
			res.send (docs);
		});
		next ();
	});
};
