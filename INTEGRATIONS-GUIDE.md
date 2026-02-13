# TinaMaria.com — Integrations Setup Guide

## 1. Stripe Payments (Accept payments at booking)

### What it does
When someone visits tinamaria.com/book (or clicks "Book Now" anywhere on the site), they see all your services, pick one, enter their name/email, and pay securely through Stripe Checkout. After payment, they're redirected back with a success confirmation.

### Setup Steps
1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers > API Keys**
3. Copy your **Secret Key** (starts with `sk_live_` for live, or `sk_test_` for testing)
4. In Netlify, go to **Site Settings > Environment Variables**
5. Add: `STRIPE_SECRET_KEY` = your secret key
6. Deploy and test with a test key first!

### Testing
- Use `sk_test_` key first
- Test card: `4242 4242 4242 4242` (any future expiry, any CVC)
- Visit yourdomain.com/book to test the full flow

---

## 2. Resend Email Campaigns (Send marketing emails)

### What it does
From your admin dashboard (Marketing tab), you can compose and send email campaigns to clients directly through Resend. It sends from hello@tinamaria.com.

### Setup Steps
1. Log into [Resend](https://resend.com)
2. Go to **API Keys** and create a new key
3. **Important**: Verify your domain (tinamaria.com) in Resend:
   - Go to **Domains > Add Domain**
   - Add the DNS records Resend gives you to your domain registrar
   - Once verified, you can send from hello@tinamaria.com
4. In Netlify, add: `RESEND_API_KEY` = your API key

### Using It
- Go to Admin > Marketing > Click "Compose" tab
- Enter recipients (or click "Add all clients")
- Write your subject and message
- Click "Send via Resend"

---

## 3. Google Calendar Sync (Two-way calendar sync)

### What it does
Syncs your bookings with your Google Calendar (hello@tinamaria.com). New bookings automatically create calendar events, and you can see your Google Calendar events alongside your bookings.

### Setup Steps (one-time, ~10 minutes)

#### A. Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a Project" > "New Project"
3. Name it "TinaMaria Website" and create it

#### B. Enable Calendar API
1. In the project, go to **APIs & Services > Library**
2. Search for "Google Calendar API"
3. Click it and click **Enable**

#### C. Create OAuth Credentials
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client ID**
3. If prompted, configure the consent screen first:
   - User type: Internal (since it's Google Workspace)
   - App name: "TinaMaria Booking"
   - User support email: hello@tinamaria.com
4. For the OAuth client:
   - Application type: **Web application**
   - Name: "TinaMaria Calendar"
   - Authorized redirect URI: `https://tinamaria.com/.netlify/functions/google-calendar?action=callback`
5. Copy the **Client ID** and **Client Secret**

#### D. Add to Netlify
1. In Netlify, add these environment variables:
   - `GOOGLE_CLIENT_ID` = your client ID
   - `GOOGLE_CLIENT_SECRET` = your client secret
2. Deploy the site

#### E. Complete the OAuth Flow
1. Visit: `https://tinamaria.com/.netlify/functions/google-calendar?action=auth`
2. Sign in with hello@tinamaria.com
3. Grant calendar access
4. Copy the refresh token from the page
5. Add to Netlify: `GOOGLE_REFRESH_TOKEN` = the token
6. Redeploy

### Using It
- In Admin > Calendar, you'll see a green "Google Calendar synced" bar
- Click "Sync Now" to pull events from Google Calendar
- New bookings from Stripe will automatically sync to Google Calendar

---

## 4. Instagram Booking Link

### What it does
Creates a clean `/book` URL on your site specifically for Instagram bio links.

### Setup
Just add this URL to your Instagram bio:

```
tinamaria.com/book
```

That's it! When someone taps it, they see a beautiful booking page with all your services and Stripe checkout built in.

### Instagram Bio Example
```
Tina Maria ✨
Life Coach · Hypnotherapist · Digital Marketing
🎵 Zoey Zest
📖 Author of "1000 No's"
🔗 Book a session 👇
tinamaria.com/book
```

---

## Environment Variables Checklist

Add all of these to **Netlify > Site Settings > Environment Variables**:

| Variable | Source | Required |
|----------|--------|----------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard > API Keys | Yes |
| `RESEND_API_KEY` | Resend > API Keys | Yes |
| `GOOGLE_CLIENT_ID` | Google Cloud Console | For calendar |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console | For calendar |
| `GOOGLE_REFRESH_TOKEN` | OAuth flow (step E above) | For calendar |

---

## Quick Deploy Steps

1. `cd tinamaria-site`
2. `npm install`
3. `npm run dev` (test locally)
4. Push to GitHub
5. Connect to Netlify
6. Add environment variables
7. Deploy!

Your site will be live at tinamaria.com with:
- Stripe payments at /book
- Resend email campaigns in admin
- Google Calendar sync in admin
- Instagram-ready booking link
