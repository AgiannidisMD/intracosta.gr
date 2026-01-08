# Intracosta Transport & Logistics

Modern, multilingual marketing website for Intracosta's transport and logistics services.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Local Setup](#local-setup)
  - [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Resources](#resources)

## Overview
The application delivers a high-performing, fully responsive experience tailored for a multilingual audience (Greek, English, German). It emphasizes modern visuals, smooth animations, and secure data handling via email integration.

## Features
- Multilingual interface (Greek, English, German)
- Responsive layout optimized for mobile, tablet, and desktop
- Modern UI with motion effects
- Advanced quote request form with validation
- CSRF-protected form submission
- Email integration for contact and quote requests
- SEO-friendly metadata and markup

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Express.js (for API endpoints)
- React Router
- Framer Motion
- React Helmet Async

## Getting Started

### Local Setup
1. Clone the repository.
2. Create a `.env` file in the root directory with your SMTP email configuration:
   ```env
   SMTP_HOST=smtp.example.com
   SMTP_PORT=465
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-email-password
   MAIL_FROM=your-email@example.com
   MAIL_TO_CONTACT=contact@example.com
   MAIL_TO_QUOTE=quotes@example.com
   ```
   **Required variables:** `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`
   
   **Optional variables:** `SMTP_PORT` (defaults to 465), `MAIL_FROM`, `MAIL_TO_CONTACT`, `MAIL_TO_QUOTE`, `MAIL_TO`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```
6. Start the production server:
   ```bash
   npm start
   ```

### Available Scripts
- `npm run dev` – start the Vite dev server with hot reloading.
- `npm run build` – create an optimized production build.

## Deployment
The project can be deployed to various platforms. Configure the required environment variables in your deployment platform before building:

**Required environment variables:**
- `SMTP_HOST` - Your SMTP server hostname
- `SMTP_USER` - Your SMTP username/email
- `SMTP_PASS` - Your SMTP password

**Optional environment variables:**
- `SMTP_PORT` - SMTP port (defaults to 465)
- `MAIL_FROM` - Email sender address (defaults to SMTP_USER)
- `MAIL_TO_CONTACT` - Contact form recipient (defaults to SMTP_USER)
- `MAIL_TO_QUOTE` - Quote form recipient (defaults to SMTP_USER)
- `PORT` - Server port (defaults to 3000)
- `NODE_ENV` - Environment (development/production)

For server-based deployments (cPanel, VPS, etc.), see `CPANEL_DEPLOYMENT.md` for detailed instructions.

## Project Structure
- `src/components` – shared UI components.
- `src/pages` – route-level pages.
- `src/contexts` – React context providers (e.g., language).
- `src/utils` – helper utilities.
- `api/` – API route handlers for contact and quote forms.
- `server.js` – Express server for production deployments.
- `public` – static assets.

## Resources
- `ACCESSIBILITY_AUDIT.md` – accessibility review and findings.
- `ALL_IN_ONE_ACCESSIBILITY.md` – accessibility widget reference.
- `CPANEL_DEPLOYMENT.md` – instructions for cPanel deployments.
- `deploy-to-cpanel.sh` – helper script for hosting on cPanel.
