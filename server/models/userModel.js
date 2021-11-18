const mongoose = require('mongoose');
const { alarmSchema } = require('../models/alarmModel');

const userSchema = new mongoose.Schema({
	userName: String,
	role: { type: String, default: 'user' },
	alarmFilter: [alarmSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
