const prodKey = require ('./prodKey.js');
const devKey = require ('./devKey.js');

if (process.env.NODE_ENV === 'production') {
	module.exports = prodKey;
} else {
	module.exports = devKey;
}
