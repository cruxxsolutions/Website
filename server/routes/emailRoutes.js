const express = require('express');
const router = express.Router();

const { emailTest } = require('../controllers/emailController');

// GET /api/email-test -> runs a quick provider test (Mailtrap API preferred)
router.get('/', emailTest);

module.exports = router;
