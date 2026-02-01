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

const https = require('https');

const tokenCheck = async (req, res) => {
  const token = process.env.MAILTRAP_API_TOKEN;
  if (!token) {
    return res.status(400).json({ ok: false, message: 'MAILTRAP_API_TOKEN is not configured.' });
  }

  // Mask token for safe logging in non-production only
  if (process.env.NODE_ENV !== 'production') {
    const masked = token.length > 8 ? token.slice(0,4) + '...' + token.slice(-4) : '***';
    console.log('Validating Mailtrap token:', masked);
  }

  const options = {
    hostname: 'api.mailtrap.io',
    path: '/api/v1/inboxes',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    timeout: 5000
  };

  const reqGet = https.request(options, (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
      if (resp.statusCode === 200) {
        return res.status(200).json({ ok: true, message: 'Mailtrap token is valid (inboxes accessible).' });
      }
      if (resp.statusCode === 401) {
        return res.status(401).json({ ok: false, message: 'Mailtrap token unauthorized (invalid token or missing permissions).' });
      }
      return res.status(resp.statusCode || 502).json({ ok: false, message: `Mailtrap token check returned status ${resp.statusCode}`, details: data ? JSON.parse(data) : null });
    });
  });

  reqGet.on('error', (err) => {
    console.error('Token check request error:', err);
    return res.status(500).json({ ok: false, message: 'Token check failed: ' + (err && err.message ? err.message : String(err)) });
  });

  reqGet.on('timeout', () => {
    reqGet.destroy();
    return res.status(504).json({ ok: false, message: 'Token check timed out' });
  });

  reqGet.end();
};

module.exports = { emailTest, tokenCheck };
