var db = require('./db');

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
