const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
	severity: String,
	type: String,
	alarmName: String,
	alarmId: String,
	alarmOn: { type: Boolean, default: true }
});

const Alarm = mongoose.model('Alarm', alarmSchema);
module.exports = { Alarm, alarmSchema };
