const nodemailer = require('nodemailer');

// Contact form handler
const submitContact = async (req, res) => {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    try {
        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
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
            subject: 'Thank you for contacting Cruxx Solutions',
            html: `
                <p>Dear ${name},</p>
                <p>We have received your request and will get back to you soon.</p>
                <p>Best regards,<br>Cruxx Solutions Team</p>
            `
        };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        res.status(200).json({ message: 'Email successfully sent.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Something went wrong: ' + error.message });
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
