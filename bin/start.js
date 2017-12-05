const app = require ('express') ();
const server = require ('http').Server (app);

// app routes
require ('../routes/generalRoutes') (app);
require ('../routes/authRoutes') (app);

// import socket
require ('../server/socket') (server);

// passport
require ('../server/passport');

const PORT = process.env.PORT || 4000;
server.listen (PORT);
console.log ('node server is running on port:', PORT);
