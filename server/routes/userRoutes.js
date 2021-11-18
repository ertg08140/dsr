const express = require('express');
const {
	postUser,
	updateUser,
	getUser
} = require('../controllers/userController');

const router = express.Router();

router.route('/').post(postUser).put(updateUser).get(getUser);

module.exports = router;
