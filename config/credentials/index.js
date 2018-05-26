const prodKey = require ("./prodKey.js");
const devKey = require ("./devKey.js")||null;
const ciKey = require ('./ciKey.js');

if (process.env.NODE_ENV === "production") {
  module.exports = prodKey;
}
if (process.env.NODE_ENV === "ci") {
  module.exports = ciKey;
}
module.exports = devKey;
