const asyncHandler = require('express-async-handler');
const Help = require('../models/helpModel');

const postHelp = asyncHandler(async (req, res) => {
	const { instance, description, unit, unitPhone, unitEmail } = req.body;

	const help = new Help({
		instance,
		description,
		unit,
		unitPhone,
		unitEmail
	});

	const newHelp = await help.save();

	if (newHelp) {
		res.status(200).json(newHelp);
	} else {
		res.status(404);
		throw new Error('Item was not added');
	}
});

const getHelp = asyncHandler(async (req, res) => {
	const helpList = await Help.find();

	if (helpList) {
		res.status(200).json(helpList);
	} else {
		res.status(404);
		throw new Error('List was not found');
	}
});

const deleteHelp = asyncHandler(async (req, res) => {
	const help = await Help.findById(req.params.id);

	if (help) {
		await help.remove();
		res.json({ message: 'Item removed' });
	} else {
		res.status(404);
		throw new Error('Item was not found');
	}
});

const updateHelp = asyncHandler(async (req, res) => {
	const { _id, instance, description, unit, unitPhone, unitEmail } = req.body;
	const updatedHelp = await Help.findByIdAndUpdate(
		{ _id },
		{ instance, description, unit, unitPhone, unitEmail },
		{ new: true }
	);

	if (updatedHelp) {
		res.status(200).json(updatedHelp);
	} else {
		res.status(404);
		throw new Error('Item was not found');
	}
});

module.exports = { postHelp, getHelp, deleteHelp, updateHelp };
