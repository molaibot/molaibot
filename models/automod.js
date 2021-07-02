const m = require('mongoose');

module.exports = m.model(
	'automoderation',
	new m.Schema({
		guild: String,
		enabled: Boolean,
	})
);
