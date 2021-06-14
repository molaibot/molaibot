const m = require('mongoose');

module.exports = m.model(
	'leaveRecords',
	new m.Schema({
		Guild: String,
		Channel: String,
	})
);
