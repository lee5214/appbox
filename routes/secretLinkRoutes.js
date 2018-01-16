const mongoose = require ('mongoose');
const requireLogin = require ('../middleware/requireLogin');
const SecretLinks_Model = mongoose.model ('SecretLinks_Model');
const Users_Model = mongoose.model ('Users_Model');

module.exports = (app) => {
	app.post ('/api/secretLinks/generateLink', requireLogin, async (req, res, next) => {
		const {origionalUrl, userId, token} = req.body;
		let displayName = '', avatar = '', dateCreated = new Date ();
		await Users_Model.findOne ({_id : userId}, (err, user) => {
			console.log ('get user', user.local);
			displayName = user.local.displayName;
			avatar = user.local.avatar;
		});
		const link = new SecretLinks_Model ({
			userId,
			origionalUrl,
			dateCreated,
			token,
			avatar,
			displayName,
		});
		await link.save ((err) => {
			if (err) {
				console.log ('db err =>', err);
			}
		});
		console.log ('new link saved', link);
		res.json (link);
		next ();
	});

	app.get ('/api/secretLinks/publicLinksList', (req, res) => {
		SecretLinks_Model.find ({}, (err, docs) => {
			res.send (docs);
		});
	});
	app.get ('/api/secretLinks/privateLinksList', (req, res) => {
		SecretLinks_Model.find ({userId : req.user._id}, (err, docs) => {
			console.log(req)
			res.send(docs)
		});
	});
	// const middleware = ConnectRoute((router) => {
	// 	router.get('/:token', req => {
	// 		console.log(req)
	// 	})
	// })
	// app.use(middleware)
	app.get ('/l/:token', (req, res) => {
		SecretLinks_Model.findOneAndUpdate ({token : req.params.token}, {$inc : {clickCounter : 1}}, (err, doc) => {
			if (err) {
				console.log (err);
			}
			console.log (doc.origionalUrl);
			res.redirect (doc.origionalUrl);
		});
	});

};
