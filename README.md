# UO Rewards Dashboard - Vercel Deployment Guide

This is a members-only dashboard that requires email sign-up and verification.

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings and deploy

## Current Implementation (Frontend Only)

The current setup uses:
- **localStorage** for user data storage
- **sessionStorage** for verification codes
- **Client-side authentication**

⚠️ **Note**: This is suitable for demos/prototypes. For production, see "Upgrading to Production" below.

## File Structure

```
├── index.html          # Protected dashboard (main page)
├── signup.html         # User registration
├── login.html          # User sign-in
├── verify.html         # Email verification
├── vercel.json         # Vercel configuration
├── package.json        # Node.js dependencies
└── api/               # (Optional) API routes for production
```

## Environment Variables (Optional)

If you upgrade to use API routes, you'll need to set these in Vercel:

- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Secret for JWT tokens
- `EMAIL_SERVICE_API_KEY` - Email service API key (SendGrid, Resend, etc.)
- `NEXT_PUBLIC_APP_URL` - Your app URL

To set environment variables in Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables

## Upgrading to Production (Optional)

For a production-ready setup, consider:

### 1. Add API Routes

Create `/api` directory with serverless functions:

- `/api/auth/signup.js` - Handle user registration
- `/api/auth/login.js` - Handle authentication
- `/api/auth/verify.js` - Handle email verification
- `/api/auth/logout.js` - Handle logout

### 2. Database Integration

Use Vercel Postgres, Supabase, or MongoDB:
- Store user credentials securely (hashed passwords)
- Store verification codes
- Track verification status

### 3. Email Service

Integrate with:
- **Resend** (recommended, simple API)
- **SendGrid**
- **AWS SES**
- **Postmark**

### 4. Authentication

Use:
- **JWT tokens** for session management
- **HTTP-only cookies** for secure token storage
- **Refresh tokens** for long-lived sessions

## Testing Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Vercel dev server**:
   ```bash
   vercel dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

## Troubleshooting

### Static files not loading
- Ensure all HTML files are in the root directory
- Check that image paths are relative (e.g., `header.png` not `/header.png`)

### Authentication not working
- Check browser console for errors
- Verify localStorage is enabled
- Clear browser cache and try again

### Deployment fails
- Check `vercel.json` configuration
- Ensure `package.json` exists
- Review Vercel build logs

## Support

For Vercel-specific issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
