const nodemailer = require('nodemailer');
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

    const canUseMailtrap = !!(process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS);
    const canUseSMTP = !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS;

    if (!canUseMailtrap && !canUseSMTP) {
        console.error('No email provider configured (MAILTRAP_USER/MAILTRAP_PASS or EMAIL_USER/EMAIL_PASS).');
        if (process.env.NODE_ENV !== 'production') {
            console.log('DEV MODE: Simulating email send for contact:', { name, email, company, message });
            return res.status(200).json({ message: 'DEV: simulated email sent.' });
        }
        return res.status(500).json({ message: 'Email service not configured. Set MAILTRAP_USER/MAILTRAP_PASS or EMAIL_USER/EMAIL_PASS.' });
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

        // Fallback to SMTP via nodemailer (supports Mailtrap)
        let transporter;
        if (canUseMailtrap) {
            transporter = nodemailer.createTransport({
                host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
                port: Number(process.env.MAILTRAP_PORT) || 2525,
                auth: {
                    user: process.env.MAILTRAP_USER,
                    pass: process.env.MAILTRAP_PASS
                }
            });
        } else {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
        }

        // Verify connection first to surface connection errors (e.g., ETIMEDOUT)
        try {
            await transporter.verify();
        } catch (verifyErr) {
            console.error('SMTP verify error:', verifyErr);
            if (verifyErr && verifyErr.code === 'ETIMEDOUT') {
                return res.status(502).json({ message: 'Email provider connection timed out. Check provider or network.' });
            }
            return res.status(502).json({ message: 'Failed to connect to SMTP server.' });
        }

        const adminMailOptions = {
            from,
            to: adminRecipient,
            subject: `Contact Form Submission from ${name}`,
            html: adminHtml
        };

        const userMailOptions = {
            from,
            to: email,
            subject: 'Thank you for contacting us',
            html: userHtml
        };

        console.log('Sending email to admin and user via SMTP...');
        const infoAdmin = await transporter.sendMail(adminMailOptions);
        console.log('Admin email send result:', infoAdmin && infoAdmin.messageId);
        const infoUser = await transporter.sendMail(userMailOptions);
        console.log('User email send result:', infoUser && infoUser.messageId);

        return res.status(200).json({ message: 'Email successfully sent via SMTP.' });
    } catch (error) {
        console.error('Contact submit error:', error);
        return res.status(500).json({ message: 'Failed to send email. ' + (error && error.message ? error.message : '') });
    }
};

module.exports = { submitContact }; 
