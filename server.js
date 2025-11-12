import express from 'express';
import helmet from 'helmet';
import path from 'path';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      connectSrc: ["'self'"],
    },
  },
}));
app.use(helmet.hsts());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === 'production';
const csrfProtection = csurf({ cookie: { httpOnly: true, secure: isProduction, sameSite: 'strict' } });
app.use(csrfProtection);
app.use((req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { secure: isProduction, sameSite: 'strict' });
  next();
});

// Email transport
const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const requiredEnvVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

const mailFrom = process.env.MAIL_FROM || smtpUser;
const mailToContact = process.env.MAIL_TO_CONTACT || process.env.MAIL_TO || smtpUser;
const mailToQuote = process.env.MAIL_TO_QUOTE || process.env.MAIL_TO || smtpUser;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort || 465,
  secure: (smtpPort || 465) === 465, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass
  },
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000,   // 30 seconds
  socketTimeout: 60000,     // 60 seconds
});

// Test SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection failed:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

function buildPlainText(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value ?? ''}`)
    .join('\n');
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body || {};
    const subject = `New contact from ${name || 'Unknown'}`;
    const text = buildPlainText({ name, email, company, message });

    await transporter.sendMail({
      from: mailFrom,
      to: mailToContact,
      replyTo: email || undefined,
      subject,
      text,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.post('/api/quote', async (req, res) => {
  try {
    const payload = req.body || {};
    const subject = `New quote request from ${payload?.companyName || 'Unknown company'}`;
    const text = buildPlainText(payload);

    await transporter.sendMail({
      from: mailFrom,
      to: mailToQuote,
      replyTo: payload?.email || undefined,
      subject,
      text,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send quote email', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

const staticPath = path.join(__dirname, 'dist');
app.use(express.static(staticPath));

app.get('/robots.txt', (_req, res) => {
  res.sendFile(path.join(staticPath, 'robots.txt'));
});

app.get('/sitemap.xml', (_req, res) => {
  res.sendFile(path.join(staticPath, 'sitemap.xml'));
});

// Serve index.html for any SPA route
app.get('*', (_req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const port = process.env.PORT || 3000;

let server;
if (isProduction) {
  try {
    const keyPath = process.env.HTTPS_KEY || path.join(__dirname, 'key.pem');
    const certPath = process.env.HTTPS_CERT || path.join(__dirname, 'cert.pem');
    const key = fs.readFileSync(keyPath);
    const cert = fs.readFileSync(certPath);
    server = https.createServer({ key, cert }, app);
  } catch {
    console.warn('Failed to load HTTPS certificates, falling back to HTTP');
    server = http.createServer(app);
  }
} else {
  server = http.createServer(app);
}

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
