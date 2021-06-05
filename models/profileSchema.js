const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	userID: { type: String, require: true, unique: true },
	serverID: { type: String, require: true },
	mCoins: { type: Number, default: 1500 },
	bank: { type: Number },
});

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;
