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
The application delivers a high-performing, fully responsive experience tailored for a multilingual audience (Greek, English, German). It emphasizes modern visuals, smooth animations, and secure data handling backed by Supabase.

## Features
- Multilingual interface (Greek, English, German)
- Responsive layout optimized for mobile, tablet, and desktop
- Modern UI with motion effects
- Advanced quote request form with validation
- CSRF-protected form submission
- Supabase-backed data storage
- SEO-friendly metadata and markup

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- React Router
- Framer Motion
- React Helmet Async

## Getting Started

### Local Setup
1. Clone the repository.
2. Copy `.env.example` to `.env` and provide your Supabase credentials.
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

### Available Scripts
- `npm run dev` – start the Vite dev server with hot reloading.
- `npm run build` – create an optimized production build.

## Deployment
The project is ready for deployment on Vercel. Configure the required environment variables in your Vercel project before triggering a build:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

After the variables are set, every push to the connected repository will create a new deployment automatically.

## Project Structure
- `src/components` – shared UI components.
- `src/pages` – route-level pages.
- `src/contexts` – React context providers (e.g., language).
- `src/utils` – helpers and Supabase client setup.
- `public` – static assets.
- `supabase/migrations` – database migration files.

## Resources
- `ACCESSIBILITY_AUDIT.md` – accessibility review and findings.
- `ALL_IN_ONE_ACCESSIBILITY.md` – accessibility widget reference.
- `CPANEL_DEPLOYMENT.md` – instructions for cPanel deployments.
- `deploy-to-cpanel.sh` – helper script for hosting on cPanel.
