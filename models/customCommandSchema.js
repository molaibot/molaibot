const mongoose = require('mongoose');

const customCommandSchema = new mongoose.Schema({
	serverID: { type: String, require: true },
	commandName: { type: String, require: true },
	commandResponse: { type: String },
});

const model = mongoose.model('customCommandsModel', customCommandSchema);

module.exports = model;
