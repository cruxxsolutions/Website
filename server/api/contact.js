const nodemailer = require('nodemailer');

// Contact form handler
const submitContact = async (req, res) => {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    try {
        // Set up nodemailer transporter with explicit SMTP settings
        // Using explicit settings instead of 'service: gmail' for better compatibility with Render
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                // Do not fail on invalid certs
                rejectUnauthorized: false
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 10000,
            socketTimeout: 10000
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

        // Verify connection before sending (optional but helps catch connection issues early)
        // Commented out as it can cause timeout issues - uncomment if you want to test connection first
        // await transporter.verify();

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        res.status(200).json({ message: 'Email successfully sent.' });
    } catch (error) {
        console.error('Email error:', error);
        
        // Provide more specific error messages
        if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
            return res.status(502).json({ 
                message: 'Email service connection failed. Please check SMTP settings or try again later.',
                error: 'Connection timeout or refused'
            });
        }
        
        if (error.code === 'EAUTH') {
            return res.status(401).json({ 
                message: 'Email authentication failed. Please check EMAIL_USER and EMAIL_PASS.',
                error: 'Authentication error'
            });
        }
        
        res.status(500).json({ 
            message: 'Failed to send email: ' + (error.message || 'Unknown error'),
            error: error.code || 'Unknown'
        });
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
