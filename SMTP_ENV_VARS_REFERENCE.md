# SMTP Environment Variables Reference

This file contains the SMTP environment variables that need to be configured on both **Vercel** and **cPanel** for the email functionality to work.

## 📋 Environment Variables List

Copy these exact variable names from your Vercel dashboard and configure them on cPanel:

### Required Variables (MUST have these)
```env
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

### Optional Variables (have defaults, but recommended to set)
```env
SMTP_PORT=465
MAIL_FROM=
MAIL_TO_CONTACT=
MAIL_TO_QUOTE=
MAIL_TO=
```

## 🔍 How to Find Your Vercel Environment Variables

1. Go to your Vercel dashboard: https://vercel.com
2. Select your project: **intracosta.gr**
3. Go to **Settings** → **Environment Variables**
4. Look for the SMTP variables listed above
5. Copy each variable name and value

## 📝 Template for Your Values

Fill in the values below from your Vercel configuration:

```env
# Required SMTP Configuration
SMTP_HOST=                  # Example: smtp.gmail.com or mail.yourdomain.com
SMTP_PORT=465               # Usually 465 for SSL or 587 for TLS
SMTP_USER=                  # Your SMTP username/email
SMTP_PASS=                  # Your SMTP password

# Email Recipients (Optional - defaults to SMTP_USER if not set)
MAIL_FROM=                  # Email sender address
MAIL_TO_CONTACT=            # Where contact form emails go
MAIL_TO_QUOTE=              # Where quote form emails go
MAIL_TO=                    # General fallback email (if above not set)
```

## 🚀 Setting Up on cPanel

### Method 1: Using .env file (Recommended for Node.js apps)

1. **Via cPanel File Manager:**
   - Log into cPanel
   - Open **File Manager**
   - Navigate to your Node.js app directory (where `server.js` is located)
   - Create a new file named `.env`
   - Paste all your environment variables in the format:
     ```env
     SMTP_HOST=your-value-here
     SMTP_USER=your-value-here
     SMTP_PASS=your-value-here
     # ... etc
     ```
   - Save the file
   - Set file permissions to **600** (owner read/write only) for security

2. **Via SSH:**
   ```bash
   cd /path/to/your/app
   nano .env
   # Paste your environment variables
   # Save with Ctrl+X, then Y, then Enter
   chmod 600 .env
   ```

### Method 2: Using cPanel Environment Variables (if available)

1. In cPanel, look for **Setup Node.js App** or **Environment Variables** section
2. Add each variable one by one with the exact name and value from Vercel
3. Save and restart your Node.js application

## ✅ Verification Checklist

After setting up environment variables on cPanel:

- [ ] All required variables are set (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`)
- [ ] Values match exactly what's in Vercel (copy-paste to avoid typos)
- [ ] `.env` file has correct permissions (600) if using file method
- [ ] Node.js app has been restarted after adding variables
- [ ] Test email functionality using the contact/quote forms

## 🧪 Testing Email Configuration

Once configured, you can test the SMTP connection:

1. **Via API endpoint** (if server is running):
   ```bash
   curl -X POST https://your-domain.com/api/test-email
   ```

2. **Check server logs** for:
   - `SMTP server is ready to take our messages` ✅
   - `SMTP connection failed:` ❌ (if there's an error)

## 🔐 Security Notes

- **NEVER commit `.env` files to Git** - they should be in `.gitignore`
- Keep `.env` file permissions restricted (600)
- Use strong, unique passwords for SMTP accounts
- Consider using app-specific passwords instead of main account passwords
- Rotate SMTP passwords periodically

## 📚 Related Files

- `.env.example` - Template file with variable names (no actual values)
- `server.js` - Where these environment variables are used
- `docs/EMAIL_CONFIGURATION.md` - Detailed email setup documentation
- `CPANEL_DEPLOYMENT.md` - Full cPanel deployment guide

---

**Last Updated:** $(date)
**Purpose:** Reference document for SMTP environment variables across Vercel and cPanel deployments

