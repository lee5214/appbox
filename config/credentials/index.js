// const prodKey = require ("./prodKey.js");
// const devKey = require ("./devKey.js")||null;
// const ciKey = require ('./ciKey.js');

if (process.env.NODE_ENV === "production") {
  module.exports = require ("./prodKey.js");
}
if (process.env.NODE_ENV === "ci") {
  module.exports = require ('./ciKey.js');
}

module.exports = require ("./devKey.js");
