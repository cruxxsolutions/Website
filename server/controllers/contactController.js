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

    // Ensure email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('EMAIL_USER or EMAIL_PASS is not configured.');
        // In development, simulate success so testing isn't blocked
        if (process.env.NODE_ENV !== 'production') {
            console.log('DEV MODE: Simulating email send for contact:', { name, email, company, message });
            return res.status(200).json({ message: 'DEV: simulated email sent.' });
        }
        return res.status(500).json({ message: 'Email service not configured.' });
    }

    try {
        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services or SMTP settings
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Contact Form Submission from ${name}`,
            html: `
                <p>You have a new contact form submission</p>
                <h3>Contact Details</h3>
                <ul>
                    <li>Name: ${name}</li>
                    <li>Email: ${email}</li>
                    <li>Company: ${company || 'N/A'}</li>
                </ul>
                <h3>Message</h3>
                <p>${message}</p>
            `
        };

        // Email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us',
            html: `
                <p>Dear ${name},</p>
                <p>We have received your request and will get back to you soon.</p>
                <p>Best regards,<br>Your Team</p>
            `
        };

        console.log('Sending email to admin and user...');
        const infoAdmin = await transporter.sendMail(adminMailOptions);
        console.log('Admin email send result:', infoAdmin && infoAdmin.messageId);
        const infoUser = await transporter.sendMail(userMailOptions);
        console.log('User email send result:', infoUser && infoUser.messageId);

        res.status(200).json({ message: 'Email successfully sent.' });
    } catch (error) {
        console.error('Contact submit error:', error);
        // Return only non-sensitive message to client
        return res.status(500).json({ message: 'Failed to send email. ' + (error && error.message ? error.message : '') });
    }
};

module.exports = { submitContact }; 
