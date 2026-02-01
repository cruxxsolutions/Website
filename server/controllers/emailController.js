const Mailgun = require('mailgun.js');
const FormData = require('form-data');
const dotenv = require('dotenv');

dotenv.config();

const emailTest = async (req, res) => {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    return res.status(400).json({ message: 'MAILGUN_API_KEY or MAILGUN_DOMAIN is not set' });
  }

  try {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY, url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net' });

    const from = process.env.MAILGUN_FROM || `Cruxx <postmaster@${process.env.MAILGUN_DOMAIN}>`;
    const to = process.env.ADMIN_EMAIL || 'admin@example.com';

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from,
      to: [to],
      subject: 'Test email from Cruxx (Mailgun)',
      text: 'This is a test email from the Cruxx app via Mailgun.'
    });

    return res.status(200).json({ message: 'Test email sent (Mailgun).' });
  } catch (err) {
    console.error('Mailgun send error:', err && (err.response || err.message) ? (err.response ? { status: err.response.status } : err.message) : err);
    if (err && err.response && err.response.status === 401) {
      return res.status(502).json({ message: 'Mailgun unauthorized: check MAILGUN_API_KEY and MAILGUN_DOMAIN.' });
    }
    return res.status(500).json({ message: 'Failed to send test email via Mailgun.' });
  }
};

const tokenCheck = async (req, res) => {
  const errors = [];

  if (!process.env.MAILGUN_API_KEY) {
    errors.push({ code: 'NO_TOKEN', message: 'MAILGUN_API_KEY not set' });
    return res.status(400).json({ ok: false, errors });
  }

  try {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY, url: process.env.MAILGUN_API_URL || 'https://api.mailgun.net' });

    if (process.env.MAILGUN_DOMAIN) {
      // Try to get the domain to check access
      await mg.domains.get(process.env.MAILGUN_DOMAIN);
      return res.status(200).json({ ok: true, message: 'Token can access the specified Mailgun domain' });
    }

    // If no domain provided, list domains
    const list = await mg.domains.list();
    if (list && list.items && list.items.length > 0) {
      return res.status(200).json({ ok: true, message: 'Token can list domains', domainsFound: list.items.length });
    }

    errors.push({ code: 'NO_DOMAINS', message: 'Mailgun returned no domains for this API key.' });
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      errors.push({ code: 'UNAUTHORIZED', message: 'Mailgun API unauthorized (401). Check MAILGUN_API_KEY.' });
    } else {
      errors.push({ code: 'UNKNOWN', message: 'Unexpected error calling Mailgun API', detail: err && err.message ? err.message : String(err) });
    }
  }

  return res.status(502).json({ ok: false, errors });
};

module.exports = { emailTest, tokenCheck };
