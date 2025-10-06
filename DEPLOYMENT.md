# Academix - MongoDB + Vercel Deployment Guide

## Prerequisites
- MongoDB Atlas account (already configured)
- Vercel account ([https://vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `mongodb@^6.3.0` - MongoDB driver
- `http-server` and `live-server` - Local development servers

## Step 2: Test Locally with Vercel Dev

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   vercel dev
   ```

4. **Test the form submission**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Fill out and submit the appointment form
   - Check MongoDB Atlas to verify data was saved

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI

```bash
vercel
```

Follow the prompts to link your project and deploy.

### Option B: Deploy via Vercel Dashboard

1. **Push code to Git**:
   ```bash
   git add .
   git commit -m "Configure MongoDB backend with Vercel"
   git push
   ```

2. **Import to Vercel**:
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Click "Import"

3. **Configure Environment Variables**:
   In the Vercel dashboard, go to **Settings → Environment Variables** and add:

   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | `mongodb+srv://Academix-admin:VwCCtasgkklQArow@academix-cluster.nacfctb.mongodb.net/academix-db?retryWrites=true&w=majority&appName=academix-cluster` |

   Optional (if using EmailJS):
   | Name | Value |
   |------|-------|
   | `EMAILJS_SERVICE_ID` | Your EmailJS service ID |
   | `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
   | `EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
   | `EMAILJS_PRIVATE_KEY` | Your EmailJS private key |

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

## Step 4: Verify Deployment

1. **Test form submission** on your live site
2. **Check MongoDB Atlas**:
   - Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
   - Navigate to **Database → Browse Collections**
   - Select `academix-db` → `form_submissions`
   - Verify your test submissions appear

## Architecture Overview

```
Academix
├── api/
│   └── submit-form.js          # Vercel Serverless Function (API endpoint)
├── lib/
│   └── mongodb.js              # MongoDB connection helper
├── submit-handler.js           # Frontend form handler
├── index.html                  # Main website
├── vercel.json                 # Vercel configuration
├── package.json                # Dependencies
└── .env.local                  # Local environment variables (git-ignored)
```

## API Endpoints

### POST /api/submit-form
Handles form submissions and saves to MongoDB.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+33 1 23 45 67 89",
  "subject": "corporate-finance",
  "sessionType": "individual",
  "preferredDate": "2025-01-15",
  "preferredTime": "14:00",
  "message": "Optional message"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "id": "676...",
    "email_sent": false,
    "timestamp": "2025-01-06T..."
  }
}
```

## MongoDB Collections

### `form_submissions` Collection
Stores all form submissions with the following schema:

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  subject: String,
  sessionType: String,
  preferredDate: String,
  preferredTime: String,
  message: String,
  createdAt: Date,
  ipAddress: String,
  userAgent: String,
  status: String,  // 'pending', 'contacted', 'completed'
  timestamp: String,
  language: String
}
```

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string in environment variables
- Check Network Access in MongoDB Atlas (should allow `0.0.0.0/0`)
- Verify Database User has correct permissions

### Form Submission Not Working
- Check browser console for errors
- Verify API endpoint is accessible: `https://your-site.vercel.app/api/submit-form`
- Check Vercel function logs in dashboard

### Vercel Build Errors
- Ensure all dependencies are in `package.json`
- Check `vercel.json` configuration
- Review build logs in Vercel dashboard

## Security Notes

1. **Never commit `.env.local`** - It's git-ignored by default
2. **MongoDB credentials** are stored securely in Vercel environment variables
3. **CORS is enabled** for Vercel deployment domains
4. **Form validation** happens both client-side and server-side

## Next Steps

- [ ] Configure custom domain in Vercel
- [ ] Set up EmailJS for email notifications
- [ ] Add form analytics
- [ ] Create admin dashboard to view submissions
- [ ] Add spam protection (reCAPTCHA)

## Support

For issues or questions:
- MongoDB Atlas: [https://www.mongodb.com/docs/atlas](https://www.mongodb.com/docs/atlas)
- Vercel: [https://vercel.com/docs](https://vercel.com/docs)
