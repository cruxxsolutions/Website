const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const Contact = require('../models/Contact');
dotenv.config();
// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        // Save contact to database
        const contact = await Contact.create({
            name,
            email,
            company: req.body.company || '', // Assuming company might be optional
            message,
        });

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services
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
                    <li>Phone: ${phone}</li>
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
        await transporter.sendMail(adminMailOptions);
        console.log('Admin email sent successfully.');
        await transporter.sendMail(userMailOptions);
        console.log('User email sent successfully.');

        res.status(201).json({ message: 'Message sent successfully!', contact });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: 'Something went wrong: ' + error.message });
    }
};

module.exports = { submitContact };
