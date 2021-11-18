const asyncHandler = require('express-async-handler');
const { Alarm } = require('../models/alarmModel');

const getAlarmList = asyncHandler(async (req, res) => {
	const filterAlarms = await Alarm.find();
	if (filterAlarms) {
		res.status(200).json(filterAlarms);
	} else {
		res.status(404);
		throw new Error('Filter alarm list was not found');
	}
});

const postAlarm = asyncHandler(async (req, res) => {
	const { severity, type, alarmName, alarmId } = req.body;
	const alarm = new Alarm({ severity, type, alarmName, alarmId });
	const createAlarm = await alarm.save();
	res.status(201).json(alarm);
});

const updateAlarmList = asyncHandler(async (req, res) => {
	const { _id, alarmOn } = req.body;

	const filterAlarm = await Alarm.findByIdAndUpdate({ _id }, { alarmOn });

	if (filterAlarm) {
		res.status(200).json(filterAlarm);
	} else {
		res.status(404);
		throw new Error('Filter alarm list was not found');
	}
});

module.exports = { getAlarmList, postAlarm, updateAlarmList };
