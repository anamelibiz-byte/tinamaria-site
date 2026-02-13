# TinaMaria.com — Deployment Guide

Your site is fully built and ready to go live! Here are the steps.

---

## Step 1: Install & Preview Locally

Open Terminal (Mac) or Command Prompt (Windows) and navigate to the `tinamaria-site` folder:

```bash
cd tinamaria-site
npm install
npm run dev
```

This will start a local preview at `http://localhost:5173` — open that in your browser to see your site!

When you're happy with it, stop the server (Ctrl+C) and build the production version:

```bash
npm run build
```

This creates a `dist` folder with your optimized site.

---

## Step 2: Push to GitHub

If you haven't already, create a new repository on GitHub:

1. Go to **github.com** → click the **+** button → **New repository**
2. Name it `tinamaria-site` (or whatever you'd like)
3. Keep it **Public** or **Private** (either works with Netlify)
4. Do NOT initialize with README (we already have files)
5. Click **Create repository**

Then in your terminal (from inside the tinamaria-site folder):

```bash
git init
git add .
git commit -m "Initial commit — TinaMaria.com"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tinamaria-site.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Step 3: Deploy on Netlify

1. Go to **app.netlify.com** and log in (or sign up — it's free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify to access your repos
4. Select your `tinamaria-site` repository
5. Netlify will auto-detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

Your site will be live in about 60 seconds at a random Netlify URL like `something-random.netlify.app`.

---

## Step 4: Connect Your TinaMaria.com Domain

1. In Netlify, go to your site → **Domain settings** → **Add custom domain**
2. Type in `tinamaria.com` and click **Verify**
3. Netlify will give you nameserver or DNS instructions. You have two options:

### Option A: Use Netlify DNS (Easiest)
- Point your domain's nameservers to Netlify's nameservers
- Go to where you bought tinamaria.com (GoDaddy, Namecheap, etc.)
- Update the nameservers to the ones Netlify provides
- Netlify will automatically set up HTTPS/SSL for you

### Option B: Add DNS Records Manually
- Keep your current nameservers
- Add an **A record** pointing to Netlify's load balancer IP: `75.2.60.5`
- Add a **CNAME** for `www` pointing to your Netlify site URL
- Enable HTTPS in Netlify settings after DNS propagates

DNS changes can take anywhere from a few minutes to 48 hours (usually under an hour).

---

## Step 5: Enable HTTPS (Free SSL)

Once your domain is connected:
1. Go to **Domain settings** → **HTTPS**
2. Click **"Verify DNS configuration"**
3. Click **"Provision certificate"**
4. Netlify will automatically get a free SSL certificate from Let's Encrypt

---

## Making Updates Later

Whenever you want to update your site:

1. Edit the files in your `tinamaria-site` folder
2. In terminal:
   ```bash
   git add .
   git commit -m "Updated [whatever you changed]"
   git push
   ```
3. Netlify automatically rebuilds and deploys within ~60 seconds!

---

## Project Structure

```
tinamaria-site/
├── index.html          ← Main HTML file (SEO meta tags, fonts)
├── package.json        ← Dependencies and scripts
├── vite.config.js      ← Build configuration
├── netlify.toml        ← Netlify deployment settings
├── .gitignore          ← Files to exclude from Git
├── public/
│   └── favicon.svg     ← Browser tab icon (TM logo)
└── src/
    ├── main.jsx        ← React entry point
    └── App.jsx         ← Your entire site + admin dashboard
```

---

## Need Help?

If you get stuck on any step, just ask! The most common issues are:
- **npm not found**: Install Node.js from nodejs.org first
- **Git not found**: Install Git from git-scm.com
- **Domain not working**: DNS takes time — wait an hour and try again
