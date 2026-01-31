const nodemailer = require('nodemailer');
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
        }

        // Fallback to SMTP via nodemailer (supports Mailtrap SMTP)
        let transporter;
        let smtpHost = null;
        let smtpPort = null;
        if (canUseMailtrap) {
            smtpHost = process.env.MAILTRAP_HOST || 'smtp.mailtrap.io';
            smtpPort = Number(process.env.MAILTRAP_PORT) || 2525;
            console.log('Configuring Mailtrap SMTP', { host: smtpHost, port: smtpPort });
            transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                auth: {
                    user: process.env.MAILTRAP_USER,
                    pass: process.env.MAILTRAP_PASS
                },
                connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT) || 15000,
                greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT) || 15000,
                socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT) || 15000
            });
        } else {
            smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
            smtpPort = parseInt(process.env.SMTP_PORT || '587');
            console.log('Configuring SMTP', { host: smtpHost, port: smtpPort });
            transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    // Do not fail on invalid certs
                    rejectUnauthorized: false
                },
                connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT) || 15000,
                greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT) || 15000,
                socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT) || 15000
            });
        }

        // Try sending and fallback to Mailtrap API on ETIMEDOUT
        try {
            console.log('Sending email to admin and user via SMTP...', { host: smtpHost, port: smtpPort });
            const infoAdmin = await transporter.sendMail(adminMailOptions);
            console.log('Admin email send result:', infoAdmin && infoAdmin.messageId);
            const infoUser = await transporter.sendMail(userMailOptions);
            console.log('User email send result:', infoUser && infoUser.messageId);

            return res.status(200).json({ message: 'Email successfully sent via SMTP.' });
        } catch (smtpErr) {
            console.error('SMTP send error:', smtpErr);
            if ((smtpErr && smtpErr.code === 'ETIMEDOUT') && process.env.MAILTRAP_API_TOKEN) {
                console.log('SMTP ETIMEDOUT — attempting Mailtrap API fallback...');
                const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
                const sender = {
                    email: process.env.MAILTRAP_FROM || (process.env.EMAIL_FROM || process.env.EMAIL_USER) || 'no-reply@localhost',
                    name: process.env.MAILTRAP_FROM_NAME || 'Cruxx'
                };
                const adminRecipients = [{ email: adminRecipient }];
                const userRecipients = [{ email }];

                await client.send({ from: sender, to: adminRecipients, subject: `Contact Form Submission from ${name}`, text: `Contact message from ${name} (${email}): ${message}`, category: 'contact-form', html: adminHtml });
                await client.send({ from: sender, to: userRecipients, subject: 'Thank you for contacting us', text: 'We have received your request and will get back to you soon.', category: 'contact-form', html: userHtml });

                return res.status(200).json({ message: 'Email sent via Mailtrap API as fallback after SMTP timeout.' });
            }

            if (smtpErr && smtpErr.code === 'ETIMEDOUT') {
                return res.status(502).json({ message: `Email provider connection timed out when connecting to ${smtpHost}:${smtpPort}. Check provider, port, or network egress rules.` });
            }

            throw smtpErr; // let outer catch handle other errors
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
