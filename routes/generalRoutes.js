const os = require ('os');
let log = {
	EOL : os.EOL,
	arch : os.arch (),
	constants : os.constants,
	cpus : os.cpus (),
	endianness : os.endianness (),
	freemem : os.freemem (),
	homedir : os.homedir (),
	hostname : os.hostname (),
	loadavg : os.loadavg (),
	networkInterfaces : os.networkInterfaces (),
	platform : os.platform (),
	release : os.release (),
	tmpdir : os.tmpdir (),
	totalmem : os.totalmem (),
	type : os.type (),
	uptime : os.uptime (),
	userInfo : os.userInfo (),
};
module.exports = (app) => {
	app.get ('/welcome', (req, res) => {
		res.send ('welcome');
	});
	app.post ('/api/validateCityName', (req, res) => {
	});

	app.get ('/api/clientLog', (req, res) => {
		console.log (os.homedir);
		res.json (log);
	});
};
// TODO url-regex ==> done
