const mongoose = require ('mongoose');
const {Schema} = mongoose;

const secretLinksSchema = new Schema (
	{
		userId : String,
		origionalUrl : String,
		targetUrl : String,
		clickCounter : {type : Number, default : 0, require : true},
		dateCreated : Date,
		dateLastVisited : Date,
	},
);

mongoose.model ('SecretLinks_Model', secretLinksSchema);
