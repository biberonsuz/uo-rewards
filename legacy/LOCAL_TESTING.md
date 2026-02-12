# Local Testing Guide

## Quick Start Options

### Option 1: Python HTTP Server (Easiest - No installation needed)

Since you have Python 3 installed, this is the simplest method:

```bash
# Navigate to project directory
cd /Users/pinarkazak/Repos/uo-rewards-redesign

# Start server
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

**To stop:** Press `Ctrl+C` in the terminal

---

### Option 2: Node.js http-server

If you prefer Node.js:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Start server
npx http-server -p 8080 -o
```

The `-o` flag automatically opens your browser.

**To stop:** Press `Ctrl+C` in the terminal

---

### Option 3: Vercel Dev (Closest to production)

This mimics the Vercel environment:

```bash
# Install Vercel CLI (one time)
npm i -g vercel

# Start dev server
vercel dev
```

This will start on **http://localhost:3000**

**To stop:** Press `Ctrl+C` in the terminal

---

### Option 4: Use the provided script

```bash
# Make executable (if not already)
chmod +x start-server.sh

# Run it
./start-server.sh
```

---

## Testing the Authentication Flow

1. **Start the server** using any method above
2. **Open the site** in your browser (usually http://localhost:8000 or http://localhost:3000)
3. **You'll be redirected to signup.html** (since you're not authenticated)
4. **Sign up** with an email and password
5. **You'll be redirected to verify.html** - enter the 6-digit code shown in the browser console
6. **After verification**, you'll be redirected to the dashboard (index.html)
7. **Test logout** using the "Sign Out" button in the header

## Important Notes

### localStorage and sessionStorage
- User data is stored in browser localStorage
- Verification codes are in sessionStorage
- **Each browser/incognito window** has separate storage
- To reset: Clear browser storage or use incognito mode

### Viewing Verification Codes
Since this is a demo (no real email), the verification code is:
- Stored in `sessionStorage`
- You can view it in browser DevTools:
  1. Open DevTools (F12 or Cmd+Option+I)
  2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
  3. Click "Session Storage" → your domain
  4. Look for `verificationCode` key

Or check the browser console - the code is logged when you sign up.

### Testing Different Users
- Use different email addresses to create multiple accounts
- Each account has its own verification code
- Use incognito/private browsing to test as different users

### Troubleshooting

**Port already in use:**
```bash
# Use a different port
python3 -m http.server 8001
# or
npx http-server -p 8081
```

**localStorage not working:**
- Make sure you're accessing via `http://localhost` not `file://`
- Some browsers block localStorage on file:// protocol

**Redirects not working:**
- Check browser console for JavaScript errors
- Ensure all HTML files are in the same directory
- Verify file paths are correct

**Can't see verification code:**
- Open browser DevTools → Console
- The code is logged when you sign up
- Or check Session Storage in DevTools → Application tab

## Quick Test Checklist

- [ ] Server starts without errors
- [ ] Can access signup.html
- [ ] Can create an account
- [ ] Redirects to verify.html
- [ ] Can enter verification code
- [ ] Redirects to dashboard after verification
- [ ] Dashboard shows protected content
- [ ] Logout button works
- [ ] After logout, redirects to login
- [ ] Can sign in with existing account

## Next Steps

Once local testing works, you can:
1. Deploy to Vercel (see README.md)
2. Test on different devices (use your local IP: `http://192.168.x.x:8000`)
3. Share with team members (use ngrok or similar for external access)
