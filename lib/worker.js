var jsdom = require('jsdom'),
	config = require('../config'),
	i = 0;


// When we get a message from the parent thread
onmessage = function(e) {
	i++;

	// If we're beneath our run cap, extract data from the passed
	// URL and post it back to the parent
	if (i < config.runs) {
		pageview(e.data);

	// Otherwise, tell the parent to stop bothering us;
	} else {
		postMessage('done');
	} 
};


// Downloads and parses <url>, extracts data from the webpage, and then
// posts that data back to the parent thread
function pageview(url) {
	var now = new Date(),
		output = {};

	jsdom.env(
		url + '?cachebust=' + now.getTime(), // Cachebust each request
		['http://code.jquery.com/jquery-1.5.min.js'], // Insert jQuery 1.5 into page
		function (err, win) { // Function to run when we get our webpage back
			var debug, metrics;

			output.err = err;
			output.site = url;
			output.events = {};
			output.captureDate = new Date();

			// If we have a window, let's jQuery some data out of it
			if (win) {
				debug = win.$('#system-debug');
				metrics = debug.find('.metrics');
				output.queries =  debug.find('.queries-logged').text().trim();

				metrics.each(function() {
					var metric = win.$(this),
						ev = metric.find('.event').text();

					output.events[ev] = {};
					output.events[ev].seconds = extract( metric.find('.time').text() );
					output.events[ev].mb = extract( metric.find('.size').text() );
				});
			}

			// Return output to the parent thread
			postMessage(output);
		}
	);
}


// Returns first work from a string
function extract(str) {
	return str.trim().split(' ').shift();
}
