const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// API Routes (register API endpoints before serving static client)
app.use('/api/contact', require('./routes/contactRoutes'));
// Health/test route for email provider connectivity
app.use('/api/email-test', require('./routes/emailRoutes'));

// Serve frontend build only if it exists
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  // Fallback - serve client for any unknown route (client-side routing)
  // IMPORTANT: ignore API routes so they are handled above
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
