const express = require('express');
const {
	getAlarmList,
	postAlarm,
	updateAlarmList
} = require('../controllers/alarmController');

const router = express.Router();

router.route('/').get(getAlarmList).post(postAlarm).put(updateAlarmList);

module.exports = router;
