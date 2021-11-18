const express = require('express');
const {
	postHelp,
	getHelp,
	deleteHelp,
	updateHelp
} = require('../controllers/helpController');

const router = express.Router();

router.route('/:id').delete(deleteHelp);
router.route('/').post(postHelp).get(getHelp).put(updateHelp);

module.exports = router;
