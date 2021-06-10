const m = require('mongoose');

module.exports = m.model(
	'welcomeRecords',
	new m.Schema({
		Guild: String,
		Channel: String,
	})
);
