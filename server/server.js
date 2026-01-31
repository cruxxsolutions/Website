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

// Serve frontend build only if it exists
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  // Fallback - serve client for any unknown route (client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// API Routes
app.use('/api/contact', require('./routes/contactRoutes'));
// Health/test route for email provider connectivity
app.use('/api/email-test', require('./routes/emailRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
