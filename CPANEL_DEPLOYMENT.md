# cPanel Deployment Guide for Intracosta Website

## Overview
Use this guide to deploy the production build of the Intracosta website to any cPanel-based host. The instructions cover both a quick automated workflow and the full manual steps for teams that prefer to upload files themselves.

## Quick Start

### Automated deployment (recommended)
```bash
npm run deploy:prepare
```
This script builds the project and lists the exact files that must be uploaded to `public_html`.

### Manual workflow
```bash
npm run build
```
After the build finishes, follow the manual deployment steps below.

---

## Manual Deployment Steps

### 1. Build the site locally
1. Open a terminal and move into the project root:
   ```bash
   cd /path/to/intracosta.gr
   ```
2. Run `npm run build` and wait for the `dist` folder to be generated.

### 2. Sign in to cPanel
1. Log in to the hosting provider's cPanel dashboard.
2. Open **File Manager**.
3. Navigate to the target directory:
   - `public_html` for the primary domain.
   - `public_html/<subdomain>` for subdomains.

### 3. Upload the build output
1. (Optional) Back up or remove any outdated files inside `public_html`.
2. On your local machine, open the `dist` folder created during the build.
3. Upload every file and folder from `dist` into `public_html`. Do not upload the `dist` directory itself—only its contents.

### 4. Verify the file layout
The `public_html` directory must contain:
- `index.html`
- `assets/` (bundled CSS, JS, images)
- `.htaccess`
- Any other files created inside `dist`

### 5. Test the live site
1. Visit the domain (for example `https://intracosta.gr`).
2. Navigate through each page, including service pages.
3. Switch languages to confirm translations load correctly.
4. Confirm media assets display as expected.

---

## Troubleshooting

### 404 errors on service pages
- Confirm `.htaccess` was uploaded to `public_html`.
- Ensure the file permissions are 644.

### "Cannot GET /" message
- Move `index.html` directly into `public_html`. It must not be nested in a subfolder.

### Missing CSS or JavaScript
- Check permissions: files should be 644 and folders 755.
- Re-upload the entire `assets` directory if files look truncated.

### Images not loading
- Confirm the `assets` directory (or any custom media folders) was uploaded intact.
- Verify case-sensitive file names match the references in HTML/JS.

---

## Automated Deployment Options

### cPanel Git Version Control
1. Open **Git Version Control** from the cPanel dashboard.
2. Clone the repository:
   - Repository URL: `https://github.com/yourusername/intracosta.gr.git`
   - Repository path: `/home/yourusername/repositories/intracosta`
3. Configure deployment:
   - Deployment path: `/home/yourusername/public_html`
   - Post-receive hook:
     ```bash
     cd /home/yourusername/repositories/intracosta
     npm install
     npm run build
     cp -r dist/* /home/yourusername/public_html/
     ```

### Manual Git plus SSH
1. SSH into the server and clone the repository:
   ```bash
   git clone https://github.com/yourusername/intracosta.gr.git
   cd intracosta.gr
   ```
2. Build and publish:
   ```bash
   npm install
   npm run build
   cp -r dist/* /home/yourusername/public_html/
   ```

---

## Expected File Structure

```
public_html/
├── index.html          # Main entry file
├── .htaccess           # React Router rewrite rules
├── assets/             # Bundled CSS, JS, images
│   ├── index-*.css
│   ├── index-*.js
│   └── images/
├── locales/            # Translation JSON files
│   ├── el/
│   ├── en/
│   └── de/
└── other static files
```

---

## Deployment Checklist

- [ ] Ran `npm run build` locally.
- [ ] Logged into cPanel and opened File Manager.
- [ ] Cleared or backed up old files in `public_html`.
- [ ] Uploaded every file from the `dist` directory.
- [ ] Confirmed `.htaccess` and `index.html` exist in `public_html`.
- [ ] Visited the domain to verify navigation, languages, and media.

---

## Getting Help
If problems persist after following this guide:
1. Revisit the troubleshooting section to narrow down the issue.
2. Confirm the `dist` output is complete by rebuilding locally.
3. Check file and folder permissions through cPanel.
4. Clear browser and CDN caches.
5. Contact the hosting provider for server-level assistance.
