const { Schema, model } = require('mongoose');

module.exports = model(
	'marriages',
	new Schema({
		User: String,
		MarriedTo: String
	})
);
