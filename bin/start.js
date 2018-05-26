const Express = require ("express");
const app = new Express ();
const http = require ("http");
const mongoose = require ("mongoose");
const passport = require ("passport");
const keys = require ("../config/credentials");
const bodyParser = require ("body-parser");
const cookieSession = require ("cookie-session");
const path = require ("path");
const server = http.Server (app);
const cors = require ("cors");
// const socketManager = require ("../services/socketManager");
const PORT = process.env.PORT || 4000;
const yes = require ("yes-https");
require ("../services/passport") ();
require ("../models/Users_Model");
require ("../models/SecretLinks_Model");

// socket.io
// io.on ('connection', socketManager);
// require ('../services/socketManager') (server);

/*
 * ---- mongo ----
 */
mongoose.connect (keys.mongo.mongoUri);

/*
 * ---- middleware section ---- requests go through middleware before route handlers
 */
app.use (cors ());
app.use (bodyParser.json ());
app.use (
  cookieSession ({
    maxAge : 30 * 24 * 60 * 60 * 1000,
    keys : [keys.cookieKey],
  }),
);
// authRoutes
app.use (passport.initialize ());
app.use (passport.session ());

/*
 * ---- route section ----
 */
require ("../routes/authRoutes") (app);
require ("../routes/secretLinkRoutes") (app);
require ("../routes/cityRoutes") (app);
require ("../routes/generalRoutes") (app);

/*
 * ---- NODE_ENV = prod || ci ----
 */
if (["production", "ci"].includes (process.env.NODE_ENV)) {
  app.use (Express.static ("client/build"));
  app.use (yes ());
  app.get ("*", (req, res) => {
    res.sendFile (path.resolve (__dirname, "../client/build/index.html"));
  });
}
server.listen (PORT);
console.log ("node services is running on port:", PORT);