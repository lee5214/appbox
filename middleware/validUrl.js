const urlRegex = require ('url-regex');

module.exports = (req, res, next) => {
	console.log(req.body.origionalUrl)
	if (!urlRegex ({exact : true, strict : false}).test (req.body.origionalUrl)) {
		return res.status (401).send ({error : 'This url is not validated'});
	}
	next()
};
