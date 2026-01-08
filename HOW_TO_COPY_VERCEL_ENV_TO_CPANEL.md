# How to Copy SMTP Environment Variables from Vercel to cPanel

## 🔍 Finding Your Vercel Environment Variables

I **cannot directly access your Vercel dashboard**, but here's how you can find and copy them:

### Step 1: Access Vercel Dashboard
1. Go to https://vercel.com and log in
2. Select your project: **intracosta.gr**
3. Click on **Settings** (gear icon in the top navigation)
4. Click on **Environment Variables** in the left sidebar

### Step 2: Find SMTP Variables
Look for these variable names (they might be named slightly differently):
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO_CONTACT`
- `MAIL_TO_QUOTE`
- `MAIL_TO`

### Step 3: Copy the Values
For each variable:
1. Click on the variable name to view its value
2. Copy the **exact value** (be careful with passwords - they're usually hidden)
3. Note down both the **variable name** and **value**

---

## 📋 What I Found in Your Documentation

Based on your codebase files, I found these SMTP values in `docs/EMAIL_CONFIGURATION.md`:

```
SMTP_HOST=mail.intracosta.com
SMTP_PORT=465
SMTP_USER=web@intracosta.com
SMTP_PASS=wx7zI?PNuEn,QuWs
MAIL_FROM=web@intracosta.com
MAIL_TO_CONTACT=web@intracosta.com
MAIL_TO_QUOTE=web@intracosta.com
```

**⚠️ Important:** Please verify these match what's actually configured in Vercel before using them!

---

## 📝 Quick Copy-Paste Template

Use this template and fill in the values from Vercel:

```env
SMTP_HOST=                  # Copy from Vercel
SMTP_PORT=465               # Usually 465 or 587
SMTP_USER=                  # Copy from Vercel
SMTP_PASS=                  # Copy from Vercel (hidden value)
MAIL_FROM=                  # Copy from Vercel (if set)
MAIL_TO_CONTACT=            # Copy from Vercel (if set)
MAIL_TO_QUOTE=              # Copy from Vercel (if set)
MAIL_TO=                    # Copy from Vercel (if set)
```

---

## 🚀 Setting Up on cPanel

### Option 1: Create .env File via cPanel File Manager

1. Log into cPanel
2. Open **File Manager**
3. Navigate to your Node.js app directory (where `server.js` is located)
   - Usually: `/home/yourusername/nodejs/intracosta.gr/`
   - Or: wherever you uploaded your server files
4. Click **+ File** → Name it `.env`
5. Open `.env` in the editor
6. Paste all your environment variables (with actual values):
   ```env
   SMTP_HOST=mail.intracosta.com
   SMTP_PORT=465
   SMTP_USER=web@intracosta.com
   SMTP_PASS=your-actual-password-here
   MAIL_FROM=web@intracosta.com
   MAIL_TO_CONTACT=web@intracosta.com
   MAIL_TO_QUOTE=web@intracosta.com
   ```
7. **Save** the file
8. Right-click `.env` → **Change Permissions** → Set to **600** (for security)

### Option 2: Create .env File via SSH

If you have SSH access:

```bash
# Navigate to your app directory
cd /home/yourusername/nodejs/intracosta.gr

# Create .env file
nano .env

# Paste your environment variables (copy from above)
# Press Ctrl+X, then Y, then Enter to save

# Set secure permissions
chmod 600 .env

# Verify it was created
ls -la .env
```

### Option 3: Use cPanel Environment Variables (if available)

Some cPanel hosts have an "Environment Variables" section:
1. In cPanel, find **Setup Node.js App** or **Environment Variables**
2. Add each variable:
   - Variable Name: `SMTP_HOST`
   - Variable Value: `mail.intracosta.com`
   - Click **Add**
3. Repeat for all variables

---

## ✅ Verification Steps

After setting up environment variables:

1. **Restart your Node.js app in cPanel**
   - Go to **Setup Node.js App**
   - Click **Restart** on your application

2. **Check server logs** for:
   ```
   SMTP server is ready to take our messages
   ```
   If you see this, email configuration is working! ✅

3. **Test the contact form:**
   - Go to your website
   - Submit the contact form
   - Check `web@intracosta.com` inbox for the email

---

## 📁 Files Created for You

I've created these files to help you:

1. **`SMTP_ENV_VARS_REFERENCE.md`** - Detailed reference guide
2. **`SMTP_VARS_FOR_CPANEL.env`** - Fillable template file
3. **`HOW_TO_COPY_VERCEL_ENV_TO_CPANEL.md`** - This file!

---

## ❓ Common Questions

**Q: Do I need all these variables?**  
A: Only `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are required. Others have defaults.

**Q: What if I don't see these variables in Vercel?**  
A: Your Vercel deployment might not have the email functionality configured (since Vercel is mainly for static sites). The email server (`server.js`) runs separately on cPanel/Node.js hosting.

**Q: Can I use the values from `docs/EMAIL_CONFIGURATION.md`?**  
A: Yes, but verify they're correct and match your actual SMTP server credentials.

**Q: What if email doesn't work after setup?**  
A: 
- Check `.env` file permissions (should be 600)
- Verify all values are correct (no extra spaces)
- Check server logs for SMTP connection errors
- Test SMTP connection using the `/api/test-email` endpoint

---

**Need help?** Check these files:
- `CPANEL_FULL_DEPLOYMENT.md` - Full deployment guide
- `docs/EMAIL_CONFIGURATION.md` - Email configuration details
- `NODEJS_SETUP_GUIDE.md` - Node.js setup instructions

