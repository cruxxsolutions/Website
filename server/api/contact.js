const Mailgun = require('mailgun.js');
const FormData = require('form-data');

// Contact form handler using Mailgun
const submitContact = async (req, res) => {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.error('MAILGUN_API_KEY or MAILGUN_DOMAIN not configured.');
        if (process.env.NODE_ENV !== 'production') {
            console.log('DEV MODE: Simulating email send for contact:', { name, email, company, message });
            return res.status(200).json({ message: 'DEV: simulated email sent.' });
        }
        return res.status(500).json({ message: 'Email service not configured. Set MAILGUN_API_KEY and MAILGUN_DOMAIN.' });
    }

    try {
        const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY, url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net' });

        const from = process.env.MAILGUN_FROM || `Cruxx <postmaster@${process.env.MAILGUN_DOMAIN}>`;
        const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@localhost';

        // Email to admin
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from,
            to: [adminRecipient],
            subject: `Contact Form Submission from ${name}`,
            text: `Contact message from ${name} (${email}): ${message}`
        });

        // Email to user
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from,
            to: [email],
            subject: 'Thank you for contacting Cruxx Solutions',
            text: 'We have received your request and will get back to you soon.'
        });

        res.status(200).json({ message: 'Email successfully sent.' });
    } catch (error) {
        console.error('Mailgun API error:', error && (error.response || error.message) ? (error.response ? { status: error.response.status } : error.message) : error);
        if (error && error.response && error.response.status === 401) {
            return res.status(502).json({ message: 'Mailgun unauthorized: check MAILGUN_API_KEY and MAILGUN_DOMAIN.' });
        }
        return res.status(500).json({ message: 'Failed to send email: ' + (error && error.message ? error.message : String(error)) });
    }
};

// Export as serverless function
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await submitContact(req, res);
};
