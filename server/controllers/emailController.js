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
      try {
        await client.send({
          from: sender,
          to: [{ email: adminRecipient }],
          subject: 'Mailtrap API test',
          text: 'This is a test message from /api/email-test',
          category: 'health-check'
        });

        return res.status(200).json({ ok: true, provider: 'mailtrap-api', message: 'Test email sent via Mailtrap API (check Mailtrap inbox).' });
      } catch (mailtrapErr) {
        console.error('Mailtrap API test error:', mailtrapErr && mailtrapErr.response && mailtrapErr.response.status ? { status: mailtrapErr.response.status } : mailtrapErr.message || mailtrapErr);
        if (mailtrapErr && mailtrapErr.response && mailtrapErr.response.status === 401) {
          return res.status(502).json({ ok: false, provider: 'mailtrap-api', message: 'Mailtrap API unauthorized: check MAILTRAP_API_TOKEN and ensure it has "Send" permission.' });
        }
        return res.status(500).json({ ok: false, provider: 'mailtrap-api', message: 'Mailtrap API test failed: ' + (mailtrapErr && mailtrapErr.message ? mailtrapErr.message : String(mailtrapErr)) });
      }
    }

    // Only Mailtrap API is supported now
    if (canUseMailtrapApi) {
      const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN });
      const sender = {
        email: process.env.MAILTRAP_FROM || process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@localhost',
        name: process.env.MAILTRAP_FROM_NAME || 'Cruxx Test'
      };

      try {
        await client.send({
          from: sender,
          to: [{ email: adminRecipient }],
          subject: 'Mailtrap API test',
          text: 'This is a test message from /api/email-test',
          category: 'health-check'
        });

        return res.status(200).json({ ok: true, provider: 'mailtrap-api', message: 'Test email sent via Mailtrap API (check Mailtrap inbox).' });
      } catch (mailtrapErr) {
        console.error('Mailtrap API test error:', mailtrapErr && mailtrapErr.response && mailtrapErr.response.status ? { status: mailtrapErr.response.status } : mailtrapErr.message || mailtrapErr);
        if (mailtrapErr && mailtrapErr.response && mailtrapErr.response.status === 401) {
          return res.status(502).json({ ok: false, provider: 'mailtrap-api', message: 'Mailtrap API unauthorized: check MAILTRAP_API_TOKEN and ensure it has "Send" permission.' });
        }
        return res.status(500).json({ ok: false, provider: 'mailtrap-api', message: 'Mailtrap API test failed: ' + (mailtrapErr && mailtrapErr.message ? mailtrapErr.message : String(mailtrapErr)) });
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      // Dev simulation if no provider configured
      return res.status(200).json({ ok: true, provider: 'dev-sim', message: 'DEV: simulated email test success.' });
    }

    return res.status(400).json({ ok: false, message: 'No email provider configured for testing. Set MAILTRAP_API_TOKEN.' });
  } catch (error) {
    console.error('Email test error:', error);
    return res.status(500).json({ ok: false, message: error && error.message ? error.message : 'Unknown error' });
  }
};

module.exports = { emailTest };
