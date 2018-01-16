const mongoose = require ('mongoose');
const {Schema} = mongoose;

const secretLinksSchema = new Schema (
	{
		userId : String,
		origionalUrl : String,
		token : String,
		targetUrl : String,
		clickCounter : {type : Number, default : 0, require : true},
		dateCreated : Date,
		dateLastVisited : Date,
		avatar : String,
		displayName : String,
	},
);

mongoose.model ('SecretLinks_Model', secretLinksSchema);
