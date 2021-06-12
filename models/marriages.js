const m = require('mongoose');

module.exports = m.model(
	'marriages',
	new m.Schema({
		To: String,
		User: String,
	})
);
