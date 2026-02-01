# Cruxx Solutions Drone Services Website

A modern, responsive corporate website for a drone solutions company built with the MERN stack.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, MongoDB
- **Tools**: Vite, Nodemon

## Setup & Installation

### 1. Backend Setup
```bash
cd server
npm install
# Create .env file if not exists (see .env.example or code)
# Seed the database
node seeder.js
# Start server
npm start
```

### 2. Frontend Setup
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
- Contact Form (sends emails via Mailgun)
- Responsive Design with Dark Mode theme

## Deployment

This project is configured for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Frontend**: Deploy `client` directory as a Vite project
2. **Backend**: Deploy `server` directory with serverless functions in `server/api`
3. Set environment variables (see [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md))

For custom domain setup and detailed instructions, refer to [DEPLOYMENT.md](./DEPLOYMENT.md).
