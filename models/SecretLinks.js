const mongoose = require ('mongoose');
const {Schema} = mongoose;

const secretLinksSchema = new Schema ({

	name : String,
	targetUrl : String,
});

mongoose.model ('users', secretLinksSchema);
