var cradle = require('cradle'),
	couch = new (cradle.Connection)('8-bitdesign.iriscouch.com', 443, {
		secure: true,
		auth: {
			username: 'logging',
			password: 'logging'
		}
	}),
	db = couch.database('logging');

db.view('logging/errors', function(err, docs) {
	docs.forEach(function(doc) {
		db.remove(doc._id, doc._rev, function() {
			console.log(arguments);
		});
	});
});

db.view('logging/pages_by_date', function(err, docs) {
	docs.forEach(function(doc) {
		db.remove(doc._id, doc._rev, function() {
			console.log(arguments);
		});
	});
});
