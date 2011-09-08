var db = require('./lib/db'),
	Worker = require('webworker').Worker,
	args = process.argv.splice(2),
	workers = [];

// Create a new web worker thread for each URL passed in
args.forEach(function(arg) {
	workers[arg] = new Worker(__dirname + '/lib/worker.js');

	// When we receieve a message back from the worker...
	workers[arg].onmessage = function(msg) {
		console.log(msg.data);

		// If the worker's finished, kill that thread
		if (msg.data === 'done') {
			workers[arg].terminate();

		// Otherwise, save and request another run
		} else {
			db.save(msg.data);
			workers[arg].postMessage(arg);
		}
	};

	// Request the first run
	workers[arg].postMessage(arg);
});
