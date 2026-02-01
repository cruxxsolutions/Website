const Mailgun = require('mailgun.js');
const FormData = require('form-data');
// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    const { name, email, company, message } = req.body;

    // Non-production: log incoming body to help debug malformed requests (no secrets)
    if (process.env.NODE_ENV !== 'production') {
        console.log('Contact submit received:', { body: req.body, rawBody: req.rawBody ? (req.rawBody.length > 1000 ? req.rawBody.slice(0,1000) + '...' : req.rawBody) : undefined });
    }

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields: name, email, and message are required.' });
    }

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.error('MAILGUN_API_KEY or MAILGUN_DOMAIN not configured.');
        if (process.env.NODE_ENV !== 'production') {
            console.log('DEV MODE: Simulating email send for contact:', { name, email, company, message });
            return res.status(200).json({ message: 'DEV: simulated email sent.' });
        }
        return res.status(503).json({ message: 'Email service not configured. Set MAILGUN_API_KEY and MAILGUN_DOMAIN.' });
    }

    const from = process.env.MAILGUN_FROM || `Cruxx <postmaster@${process.env.MAILGUN_DOMAIN}>`;
    const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@localhost';

    const adminHtml = `
        <p>You have a new contact form submission</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Company: ${company || 'N/A'}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
    `;

    const userHtml = `
        <p>Dear ${name},</p>
        <p>We have received your request and will get back to you soon.</p>
        <p>Best regards,<br>Your Team</p>
    `;

    try {
        const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY, url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net' });

        // Basic email format validation
        const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailIsValid) {
            return res.status(400).json({ message: 'Invalid recipient email address.' });
        }

        // Send email to admin
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from,
            to: [adminRecipient],
            subject: `Contact Form Submission from ${name}`,
            text: `Contact message from ${name} (${email}): ${message}`,
            html: adminHtml
        });

        // Send email to user
        await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from,
            to: [email],
            subject: 'Thank you for contacting us',
            text: 'We have received your request and will get back to you soon.',
            html: userHtml
        });

        return res.status(200).json({ message: 'Email successfully sent via Mailgun.' });
    } catch (error) {
        // Log a concise error (avoid leaking secrets)
        console.error('Mailgun API error:', error && (error.response || error.message) ? (error.response ? { status: error.response.status } : error.message) : error);

        // If Mailgun returned an HTTP response, map to a helpful status/message
        if (error && error.response && error.response.status) {
            const mgStatus = error.response.status;
            const mgBody = error.response.body ? (typeof error.response.body === 'string' ? error.response.body : JSON.stringify(error.response.body)) : error.message || '';

            if (mgStatus === 400) {
                return res.status(502).json({
                    message: 'Mailgun rejected the request (Bad Request). Check `MAILGUN_DOMAIN` and `MAILGUN_FROM` (domain verification and from address).',
                    mailgunStatus: mgStatus,
                    detail: mgBody
                });
            }

            if (mgStatus === 401) {
                return res.status(502).json({ message: 'Mailgun unauthorized: check MAILGUN_API_KEY.', mailgunStatus: mgStatus, detail: mgBody });
            }
            console.log('Mailgun response error:', error && error.response ? error.response.body : error);
            // Other Mailgun errors
            return res.status(502).json({ message: 'Mailgun API error.', mailgunStatus: mgStatus, detail: mgBody });
            
        }

        // Fallback to unexpected server error
        return res.status(500).json({ message: 'Unexpected error sending email.' });
    }
};

module.exports = { submitContact };
