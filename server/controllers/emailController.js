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
    console.log('Validating Mailtrap token (masked):', masked);
  }

  const hosts = ['api.mailtrap.io', 'send.api.mailtrap.io'];
  let lastErr = null;

  for (const host of hosts) {
    const options = {
      hostname: host,
      path: '/api/v1/inboxes',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: 5000
    };

    try {
      const result = await new Promise((resolve, reject) => {
        const reqGet = https.request(options, (resp) => {
          let data = '';
          resp.on('data', (chunk) => { data += chunk; });
          resp.on('end', () => {
            resolve({ statusCode: resp.statusCode, body: data });
          });
        });

        reqGet.on('error', (err) => reject(err));
        reqGet.on('timeout', () => { reqGet.destroy(); reject(new Error('timeout')); });
        reqGet.end();
      });

      if (result.statusCode === 200) {
        return res.status(200).json({ ok: true, message: `Mailtrap token is valid (inboxes accessible via ${host}).` });
      }

      if (result.statusCode === 401) {
        return res.status(401).json({ ok: false, message: `Mailtrap token unauthorized when calling ${host} (invalid token or missing permissions).` });
      }

      // Other non-200/401 responses; capture and continue trying next host
      lastErr = { host, statusCode: result.statusCode, body: (() => { try { return JSON.parse(result.body); } catch (e) { return result.body; } })() };
    } catch (err) {
      // DNS or network errors (ENOTFOUND etc.) — try next host
      console.warn(`Token check: host ${host} failed:`, err && err.code ? err.code : err.message || err);
      lastErr = { host, error: err && err.message ? err.message : String(err) };
      continue;
    }
  }

  // If we get here, none of the hosts succeeded
  return res.status(502).json({ ok: false, message: 'Token check failed: no Mailtrap host responded successfully.', last: lastErr });
};

module.exports = { emailTest, tokenCheck };
