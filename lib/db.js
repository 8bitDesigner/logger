var cradle = require('cradle'),
	config = require('../config'),
	couch = new (cradle.Connection)(config.host, config.port, {
		secure: config.secure,
		auth: {
			username: config.username,
			password: config.password
		}
	});

module.exports = couch.database(config.logging);
