const express = require('express');
const router = express.Router();

const { emailTest, tokenCheck } = require('../controllers/emailController');

// GET /api/email-test -> runs a quick provider test (Mailtrap API preferred)
router.get('/', emailTest);
// GET /api/email-token-check -> validate MAILTRAP_API_TOKEN without sending email
router.get('/token-check', tokenCheck);

module.exports = router;
