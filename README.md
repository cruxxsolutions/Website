# Cruxx Solutions Drone Services Website

A modern, responsive corporate website for a drone solutions company built with the MERN stack.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, MongoDB
- **Tools**: Vite, Nodemon

## Setup & Installation

### Frontend Only (No backend)
This project no longer includes a backend. The contact form opens the user's mail client to send messages. To change the recipient email, set the Vite env variable `VITE_CONTACT_EMAIL` in a `.env` file at the `client/` root (example: `VITE_CONTACT_EMAIL=you@domain.com`).

### Frontend Setup
```bash
cd client
npm install
# Start development server
npm run dev
```

### 3. Usage
Open `http://localhost:5173` in your browser.

## Features
- Dynamic Services listing
- Project Gallery
- Contact Form (client-side mailto; recipient configurable with `VITE_CONTACT_EMAIL`)
- Responsive Design with Dark Mode theme

## Deployment

This project is configured for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Frontend**: Deploy `client` directory as a Vite project
2. **Backend**: No backend to deploy — contact form uses client-side mailto. Set `VITE_CONTACT_EMAIL` in your Vercel environment variables if you want to change the recipient (see [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md)).

For custom domain setup and detailed instructions, refer to [DEPLOYMENT.md](./DEPLOYMENT.md).
