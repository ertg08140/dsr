const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { Alarm } = require('../models/alarmModel');

const postUser = asyncHandler(async (req, res) => {
	const { userName } = req.body;
	const user = await User.findOne({ userName });
	let globalFilterAlarms = await Alarm.find();

	if (user) {
		let i = 0;

		while (i < user.alarmFilter.length) {
			let tempArr = globalFilterAlarms.filter((item) => {
				return item.alarmId !== user.alarmFilter[i].alarmId ? item : null;
			});

			globalFilterAlarms = [...tempArr];
			tempArr = [];

			i++;
		}

		user.alarmFilter = [...globalFilterAlarms, ...user.alarmFilter];

		res.status(200).json(user);
	} else {
		const newUser = new User({ userName });
		const createdUser = await newUser.save();

		res.status(200).json(createdUser);
	}
});

const updateUser = asyncHandler(async (req, res) => {
	const { userName, alarmFilter } = req.body;

	const user = await User.findOneAndUpdate(
		{ userName },
		{ alarmFilter },
		{ new: true }
	);

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error('User was not found');
	}
});

const getUser = asyncHandler(async (req, res) => {});

module.exports = { postUser, updateUser, getUser };
