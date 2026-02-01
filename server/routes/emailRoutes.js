const express = require('express');
const router = express.Router();

const { emailTest, tokenCheck } = require('../controllers/emailController');

// GET /api/email-test -> runs a quick provider test (Mailgun preferred)
router.get('/', emailTest);
// GET /api/email-token-check -> validate MAILGUN_API_KEY / domain without sending email
router.get('/token-check', tokenCheck);

module.exports = router;
