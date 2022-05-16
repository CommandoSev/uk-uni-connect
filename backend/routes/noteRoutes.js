const express = require('express');
const { submitNotes } = require('../controllers/noteControllers');

const router = express.Router();

router.route('/').post(submitNotes);

module.exports = router;