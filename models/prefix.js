const m = require('mongoose');

module.exports = m.model(
	'prefix',
	new m.Schema({
		guildID: String,
		prefix: String,
	})
);
