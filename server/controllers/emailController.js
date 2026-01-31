const nodemailer = require('nodemailer');
const { MailtrapClient } = require('mailtrap');

const emailTest = async (req, res) => {
  try {
    const canUseMailtrapApi = !!process.env.MAILTRAP_API_TOKEN;
    const canUseMailtrap = !!(process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS);
    const canUseSMTP = !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS;

    const adminRecipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'admin@localhost';

    if (canUseMailtrapApi) {
      const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
      const sender = {
        email: process.env.MAILTRAP_FROM || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@localhost',
        name: process.env.MAILTRAP_FROM_NAME || 'Cruxx Test'
      };

      // send a test message to the admin recipient (captured in Mailtrap)
      await client.send({
        from: sender,
        to: [{ email: adminRecipient }],
        subject: 'Mailtrap API test',
        text: 'This is a test message from /api/email-test',
        category: 'health-check'
      });

      return res.status(200).json({ ok: true, provider: 'mailtrap-api', message: 'Test email sent via Mailtrap API (check Mailtrap inbox).' });
    }

    if (canUseMailtrap || canUseSMTP) {
      // Test SMTP connectivity
      let transporter;
      let smtpHost = null;
      let smtpPort = null;

      if (canUseMailtrap) {
        smtpHost = process.env.MAILTRAP_HOST || 'smtp.mailtrap.io';
        smtpPort = Number(process.env.MAILTRAP_PORT) || 2525;
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
          },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 15000
        });
      } else {
        smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        smtpPort = parseInt(process.env.SMTP_PORT || '587');
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: { rejectUnauthorized: false },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 15000
        });
      }

      try {
        await transporter.verify();
        return res.status(200).json({ ok: true, provider: canUseMailtrap ? 'mailtrap-smtp' : 'smtp', message: `SMTP connection verified to ${smtpHost}:${smtpPort}` });
      } catch (err) {
        if (err && err.code === 'ETIMEDOUT') {
          return res.status(502).json({ ok: false, provider: 'smtp', message: `SMTP connection timed out to ${smtpHost}:${smtpPort}. Check egress rules or try Mailtrap API.` });
        }
        return res.status(502).json({ ok: false, provider: 'smtp', message: `SMTP verify failed: ${err && err.message ? err.message : String(err)}` });
      }
    }

    return res.status(400).json({ ok: false, message: 'No email provider configured for testing. Set MAILTRAP_API_TOKEN or MAILTRAP_USER/MAILTRAP_PASS or EMAIL_USER/EMAIL_PASS.' });
  } catch (error) {
    console.error('Email test error:', error);
    return res.status(500).json({ ok: false, message: error && error.message ? error.message : 'Unknown error' });
  }
};

module.exports = { emailTest };
