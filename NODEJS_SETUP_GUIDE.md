# Simple Guide: Setting Up Node.js for API Endpoints (Steps 3 & 5)

## 🎯 What We're Doing

Your website has forms that need to send emails. To make this work, we need to run a small program (`server.js`) on your cPanel server that handles the form submissions and sends emails.

---

## 📋 Step-by-Step Instructions

### Step 1: Find Node.js in cPanel

1. **Log into your cPanel**
2. **Look for one of these options:**
   - "Node.js Selector" 
   - "Setup Node.js App"
   - "Node.js Version Manager"
   - "Application Manager" → "Node.js"

   *(The name varies by hosting provider)*

3. **If you can't find it:**
   - Contact your hosting provider and ask: "Do you support Node.js applications?"
   - Some hosts require you to enable it first

---

### Step 2: Create a New Node.js Application

Once you find the Node.js section:

1. **Click "Create Application" or "Add Application"**

2. **Fill in these settings:**
   ```
   Node.js Version: 18.x or 20.x (choose latest LTS)
   Application Root: /home/yourusername/nodejs
   Application URL: /api (or leave default)
   Application Startup File: server.js
   ```

3. **Click "Create"**

4. **Note down:**
   - The application path (where files go)
   - The port number (usually shown after creation)
   - The application URL

---

### Step 3: Upload Your Code to the Node.js App Directory

You have two options:

#### Option A: Using cPanel File Manager (Easier)

1. **Open File Manager in cPanel**
2. **Navigate to the Node.js app directory** (from Step 2)
   - Usually: `/home/yourusername/nodejs/your-app-name/`
3. **Upload these files:**
   - `server.js`
   - `package.json`
   - `package-lock.json` (if exists)

#### Option B: Using Git (If you have SSH access)

1. **SSH into your server** (or use Terminal in cPanel)
2. **Navigate to Node.js app directory:**
   ```bash
   cd /home/yourusername/nodejs/your-app-name
   ```
3. **Clone your repository:**
   ```bash
   git clone https://github.com/tolisxo/intracosta.gr.git .
   ```
   *(The `.` at the end copies files to current directory)*

---

### Step 4: Install Dependencies

1. **In cPanel, find your Node.js application**
2. **Click "Run NPM Install"** or use Terminal:

   ```bash
   cd /home/yourusername/nodejs/your-app-name
   npm install
   ```

   This installs all the packages needed (like `nodemailer`, `express`, etc.)

---

### Step 5: Create the .env File (SMTP Configuration)

**This is CRITICAL - without this, emails won't send!**

1. **In File Manager, go to your Node.js app directory**
2. **Create a new file called `.env`** (with the dot at the beginning)
3. **Open `.env` and paste this:**

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

4. **Save the file**

⚠️ **Important:** Make sure the file is named exactly `.env` (with the dot, no extension)

---

### Step 6: Update server.js Path (If Needed)

Your `server.js` needs to know where the frontend files are.

**Check line 127 in `server.js`:**

```javascript
const staticPath = path.join(__dirname, 'dist');
```

**If your frontend is in `public_html`, change it to:**

```javascript
const staticPath = '/home/yourusername/public_html';
```

*(Replace `yourusername` with your actual cPanel username)*

---

### Step 7: Start/Restart the Application

1. **In cPanel Node.js section, find your application**
2. **Click "Restart" or "Start"**
3. **Check the logs** - you should see:
   ```
   Server running on port 3000
   SMTP server is ready to take our messages
   ```

---

### Step 8: Test It Works

1. **Visit your website:** `https://intracosta.gr`
2. **Open browser console** (F12 → Console tab)
3. **Submit the contact form**
4. **Check console for errors:**
   - ✅ No errors = Good!
   - ❌ 404 error on `/api/contact` = API not working (see troubleshooting)

5. **Check your email:** `web@intracosta.com`
   - You should receive the form submission

---

## 🔧 Troubleshooting

### Problem: "Cannot find Node.js" in cPanel

**Solution:**
- Contact your hosting provider
- Ask: "How do I set up a Node.js application?"
- Some hosts require a specific hosting plan

---

### Problem: 404 Error on `/api/contact`

**Possible causes:**

1. **Node.js app not running:**
   - Go to Node.js section in cPanel
   - Make sure app status is "Running"
   - Click "Restart"

2. **Wrong API URL:**
   - Check what URL your Node.js app is using
   - It might be `https://intracosta.gr:3000` or `https://api.intracosta.gr`
   - Update frontend code to use correct URL (see below)

3. **Need to proxy API requests:**
   - Add to `.htaccess` in `public_html`:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_URI} ^/api/
   RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
   ```

---

### Problem: SMTP Connection Failed

**Check:**
1. `.env` file exists and has correct values
2. File is in the Node.js app directory (not `public_html`)
3. Restart Node.js app after creating `.env`
4. Check Node.js app logs for specific error

---

### Problem: Port Already in Use

**Solution:**
- In cPanel Node.js settings, change the port
- Update `.env` file with new port number
- Restart application

---

## 📝 Quick Checklist

- [ ] Found Node.js section in cPanel
- [ ] Created Node.js application
- [ ] Uploaded `server.js` and `package.json`
- [ ] Ran `npm install`
- [ ] Created `.env` file with SMTP credentials
- [ ] Updated `server.js` path if needed
- [ ] Started/Restarted Node.js application
- [ ] Tested contact form submission
- [ ] Received test email

---

## 🆘 Still Stuck?

1. **Check Node.js app logs** in cPanel (usually a "Logs" button)
2. **Take a screenshot** of any error messages
3. **Contact your hosting provider** - they can help with cPanel-specific issues
4. **Check these files:**
   - `CPANEL_FULL_DEPLOYMENT.md` - More detailed guide
   - `DEPLOYMENT_STATUS.md` - What works and what doesn't

---

## 💡 Alternative: Use a Service Instead

If Node.js setup is too complicated, you can use:

- **EmailJS** - Free email service (no server needed)
- **Formspree** - Form handling service
- **SendGrid** - Email API service

These require changing the frontend code to call their APIs instead of `/api/contact`.

---

## 📞 Need Help?

When you come back to this, share:
1. Screenshot of your cPanel Node.js section
2. Any error messages you see
3. What step you're stuck on

I can help you troubleshoot specific issues!

