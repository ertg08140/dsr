const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
	instance: String,
	description: String,
	unit: String,
	unitPhone: String,
	unitEmail: String
});

const Help = mongoose.model('Help', helpSchema);
module.exports = Help;
