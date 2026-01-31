const { MailtrapClient } = require('mailtrap');

// Contact form handler using Mailtrap API only
const submitContact = async (req, res) => {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    if (!process.env.MAILTRAP_API_TOKEN) {
        console.error('MAILTRAP_API_TOKEN not configured.');
        if (process.env.NODE_ENV !== 'production') {
            console.log('DEV MODE: Simulating email send for contact:', { name, email, company, message });
            return res.status(200).json({ message: 'DEV: simulated email sent.' });
        }
        return res.status(500).json({ message: 'Email service not configured. Set MAILTRAP_API_TOKEN.' });
    }

    try {
        const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
        const sender = {
            email: process.env.MAILTRAP_FROM || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@localhost',
            name: process.env.MAILTRAP_FROM_NAME || 'Cruxx'
        };

        const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@localhost';

        // Email to admin
        await client.send({
            from: sender,
            to: [{ email: adminRecipient }],
            subject: `Contact Form Submission from ${name}`,
            text: `Contact message from ${name} (${email}): ${message}`,
            category: 'contact-form'
        });

        // Email to user
        await client.send({
            from: sender,
            to: [{ email }],
            subject: 'Thank you for contacting Cruxx Solutions',
            text: 'We have received your request and will get back to you soon.',
            category: 'contact-form'
        });

        res.status(200).json({ message: 'Email successfully sent.' });
    } catch (error) {
        console.error('Mailtrap API error:', error && error.response && error.response.status ? { status: error.response.status } : error.message || error);
        if (error && error.response && error.response.status === 401) {
            return res.status(502).json({ message: 'Mailtrap API unauthorized: check MAILTRAP_API_TOKEN and its "Send" permission.' });
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
