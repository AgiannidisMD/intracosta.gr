# Complete cPanel Deployment Guide - Including API Endpoints

## ⚠️ CRITICAL: Missing Steps Identified

If you only push to GitHub and upload the `dist` folder to cPanel, **the contact and quote forms will NOT work** because:

1. ❌ API endpoints (`/api/contact` and `/api/quote`) require Node.js server (`server.js`)
2. ❌ SMTP configuration needs environment variables (`.env` file)
3. ❌ The static build only includes the frontend, not the backend server

---

## Complete Deployment Checklist

### ✅ Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### ✅ Step 2: Build the Frontend
```bash
npm run build
```
This creates the `dist` folder with static files.

### ✅ Step 3: Deploy Frontend to cPanel (public_html)

1. **Access cPanel File Manager**
2. **Navigate to `public_html`**
3. **Upload ALL contents from `dist` folder:**
   - `index.html`
   - `assets/` folder
   - `.htaccess` file (CRITICAL!)
   - `locales/` folder
   - All other static files

### ⚠️ Step 4: Set Up Node.js Application in cPanel (REQUIRED FOR API)

**This is the MISSING STEP that will break your forms!**

#### Option A: Using cPanel Node.js Selector (Recommended)

1. **In cPanel, find "Node.js Selector" or "Setup Node.js App"**
2. **Create a new Node.js application:**
   - **Application root**: `/home/yourusername/nodejs` (or similar)
   - **Application URL**: `/api` (or use a subdomain like `api.intracosta.gr`)
   - **Application startup file**: `server.js`
   - **Node.js version**: Select latest LTS (18.x or 20.x)

3. **After creating the app, SSH into your server or use Terminal in cPanel:**
   ```bash
   cd /home/yourusername/nodejs
   git clone https://github.com/yourusername/intracosta.gr.git
   cd intracosta.gr
   npm install
   ```

4. **Create `.env` file in the Node.js app directory:**
   ```bash
   cd /home/yourusername/nodejs/intracosta.gr
   nano .env
   ```
   
   Add these variables:
   ```env
   SMTP_HOST=mail.intracosta.com
   SMTP_PORT=465
   SMTP_USER=web@intracosta.com
   SMTP_PASS=wx7zI?PNuEn,QuWs
   MAIL_FROM=web@intracosta.com
   MAIL_TO_CONTACT=web@intracosta.com
   MAIL_TO_QUOTE=web@intracosta.com
   NODE_ENV=production
   PORT=3000
   ```

5. **Update `server.js` to serve from the correct path:**
   - The `staticPath` should point to `public_html` or the dist folder
   - Or configure it to serve from a shared location

6. **Restart the Node.js application in cPanel**

#### Option B: Using cPanel Application Manager

1. **Create a new application**
2. **Set the document root to your project**
3. **Configure it to run `node server.js`**
4. **Set environment variables in the application settings**

### ⚠️ Step 5: Configure API Proxy (If Node.js runs on different port/domain)

If your Node.js app runs on a different port or subdomain, you need to proxy API requests.

**Update `.htaccess` in `public_html` to add API proxying:**

```apache
# API Proxy (if Node.js runs on different port)
RewriteCond %{REQUEST_URI} ^/api/
RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]

# React Router SPA fallback (keep existing)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**OR** update frontend API calls to use full URL:
```javascript
// In Contact.tsx, QuoteFormEnhanced.tsx, premium-contact.tsx
await fetch('https://api.intracosta.gr/api/contact', { ... })
// or
await fetch('https://intracosta.gr:3000/api/contact', { ... })
```

### ✅ Step 6: Verify Deployment

1. **Test frontend:**
   - Visit `https://intracosta.gr`
   - Navigate through pages
   - Check language switching

2. **Test API endpoints:**
   - Open browser console
   - Submit contact form
   - Submit quote form
   - Check for errors in console

3. **Test SMTP:**
   - Submit a test contact form
   - Check `web@intracosta.com` inbox
   - Verify email was received

---

## File Structure After Deployment

```
/home/yourusername/
├── public_html/              # Frontend (static files)
│   ├── index.html
│   ├── assets/
│   ├── .htaccess
│   └── locales/
│
└── nodejs/                   # Backend (Node.js app)
    └── intracosta.gr/
        ├── server.js         # API server
        ├── package.json
        ├── .env              # SMTP credentials (NOT in GitHub)
        └── dist/             # Optional: if server serves from here
```

---

## Common Issues & Solutions

### ❌ Issue: Forms submit but emails don't send

**Solution:**
- Check if Node.js app is running in cPanel
- Verify `.env` file exists and has correct SMTP credentials
- Check Node.js app logs for errors
- Test SMTP connection manually

### ❌ Issue: 404 errors on `/api/contact` and `/api/quote`

**Solution:**
- Node.js application is not running
- API proxy not configured in `.htaccess`
- Frontend is calling wrong API URL

### ❌ Issue: CORS errors in browser console

**Solution:**
- Update `server.js` CORS settings if needed
- Ensure API and frontend are on same domain (or configure CORS properly)

### ❌ Issue: SMTP connection fails

**Solution:**
- Verify `.env` file has correct credentials
- Check if port 465 is allowed by hosting provider
- Test SMTP connection from server using Node.js

---

## Security Checklist

- [ ] `.env` file is NOT in GitHub (already in `.gitignore`)
- [ ] `.env` file created on server with correct credentials
- [ ] Node.js app runs with appropriate permissions
- [ ] HTTPS enabled for both frontend and API
- [ ] CSRF protection enabled (already in `server.js`)

---

## Quick Reference Commands

### On Server (via SSH or cPanel Terminal):

```bash
# Navigate to Node.js app
cd /home/yourusername/nodejs/intracosta.gr

# Install dependencies
npm install

# Create .env file
nano .env
# (paste environment variables)

# Test SMTP connection
node -e "import('nodemailer').then(nm => { const t = nm.default.createTransport({ host: 'mail.intracosta.com', port: 465, secure: true, auth: { user: 'web@intracosta.com', pass: 'wx7zI?PNuEn,QuWs' } }); t.verify((err, s) => { console.log(err ? 'FAILED: ' + err.message : 'SUCCESS'); process.exit(err ? 1 : 0); }); });"

# Restart Node.js app (via cPanel or)
pm2 restart intracosta  # if using PM2
```

---

## Summary: What You're Missing

1. **Node.js Application Setup** - Required for API endpoints
2. **Environment Variables** - Required for SMTP to work
3. **API Routing/Proxy** - May need configuration depending on setup
4. **Server Process Management** - Node.js app needs to run continuously

**Without these steps, your website will display correctly, but contact and quote forms will fail silently!**

