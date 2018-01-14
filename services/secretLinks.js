// frontend fetch data from /api/secretLinkList
const mongoose = require('mongoose')
const SecretLinks = mongoose.model('SecretLinks_Model')

// backend receive data when frontend save into db
const slink = new SecretLinks ({
	                             local : {
		                             email : profile.emails[0].value,
		                             displayName : profile.displayName,
		                             avatar : profile.photos[0].value,
	                             },
	                             google : profile._json,
                             }).save ();
