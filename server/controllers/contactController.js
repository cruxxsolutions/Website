const { MailtrapClient } = require('mailtrap');
const dotenv = require('dotenv');

dotenv.config();
// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    const { name, email, company, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields: name, email, and message are required.' });
    }

    const canUseMailtrapApi = !!process.env.MAILTRAP_API_TOKEN;
    const canUseMailtrap = !!(process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS);
    const canUseSMTP = !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS;

    if (!canUseMailtrapApi && !canUseMailtrap && !canUseSMTP) {
        console.error('No email provider configured (MAILTRAP_API_TOKEN or MAILTRAP_USER/MAILTRAP_PASS or EMAIL_USER/EMAIL_PASS).');
        if (process.env.NODE_ENV !== 'production') {
            console.log('DEV MODE: Simulating email send for contact:', { name, email, company, message });
            return res.status(200).json({ message: 'DEV: simulated email sent.' });
        }
        return res.status(500).json({ message: 'Email service not configured. Set MAILTRAP_API_TOKEN or MAILTRAP_USER/MAILTRAP_PASS or EMAIL_USER/EMAIL_PASS.' });
    }

    const from = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@localhost';
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
        // Prefer Mailtrap API if configured (helps avoid outbound SMTP blocks)
        if (canUseMailtrapApi) {
            const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
            const sender = {
                email: process.env.MAILTRAP_FROM || (process.env.EMAIL_FROM || process.env.EMAIL_USER) || 'no-reply@localhost',
                name: process.env.MAILTRAP_FROM_NAME || 'Cruxx'
            };

            const adminRecipients = [{ email: adminRecipient }];
            const userRecipients = [{ email }];

            console.log('Sending emails via Mailtrap API...');
            try {
                await client.send({
                    from: sender,
                    to: adminRecipients,
                    subject: `Contact Form Submission from ${name}`,
                    text: `Contact message from ${name} (${email}): ${message}`,
                    category: 'contact-form',
                    html: adminHtml
                });

                await client.send({
                    from: sender,
                    to: userRecipients,
                    subject: 'Thank you for contacting us',
                    text: 'We have received your request and will get back to you soon.',
                    category: 'contact-form',
                    html: userHtml
                });

                return res.status(200).json({ message: 'Email successfully sent via Mailtrap API.' });
            } catch (mailtrapErr) {
                console.error('Mailtrap API error:', mailtrapErr && mailtrapErr.response && mailtrapErr.response.status ? { status: mailtrapErr.response.status } : mailtrapErr.message || mailtrapErr);
                if (mailtrapErr && mailtrapErr.response && mailtrapErr.response.status === 401) {
                    return res.status(502).json({ message: 'Mailtrap API unauthorized: check MAILTRAP_API_TOKEN and ensure it has "Send" permissions.' });
                }
                throw mailtrapErr;
            }
        }

        // Mailtrap API only (nodemailer and SMTP removed)
        const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
        const sender = {
            email: process.env.MAILTRAP_FROM || (process.env.EMAIL_FROM || process.env.EMAIL_USER) || 'no-reply@localhost',
            name: process.env.MAILTRAP_FROM_NAME || 'Cruxx'
        };

        const adminRecipients = [{ email: adminRecipient }];
        const userRecipients = [{ email }];

        console.log('Sending emails via Mailtrap API...');
        try {
            await client.send({ from: sender, to: adminRecipients, subject: `Contact Form Submission from ${name}`, text: `Contact message from ${name} (${email}): ${message}`, category: 'contact-form', html: adminHtml });
            await client.send({ from: sender, to: userRecipients, subject: 'Thank you for contacting us', text: 'We have received your request and will get back to you soon.', category: 'contact-form', html: userHtml });

            return res.status(200).json({ message: 'Email successfully sent via Mailtrap API.' });
        } catch (mailtrapErr) {
            console.error('Mailtrap API error:', mailtrapErr && mailtrapErr.response && mailtrapErr.response.status ? { status: mailtrapErr.response.status } : mailtrapErr.message || mailtrapErr);
            if (mailtrapErr && mailtrapErr.response && mailtrapErr.response.status === 401) {
                return res.status(502).json({ message: 'Mailtrap API unauthorized: check MAILTRAP_API_TOKEN and ensure it has "Send" permissions.' });
            }
            return res.status(500).json({ message: 'Failed to send email via Mailtrap API: ' + (mailtrapErr && mailtrapErr.message ? mailtrapErr.message : String(mailtrapErr)) });
        }
    } catch (error) {
        console.error('Contact submit error:', error);
        return res.status(500).json({ message: 'Failed to send email. ' + (error && error.message ? error.message : '') });
    }
};

module.exports = { submitContact }; 
