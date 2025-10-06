# Vercel Deployment Setup for Academix

## Prerequisites
- MongoDB Atlas account (create one at https://www.mongodb.com/cloud/atlas)
- EmailJS account (optional, for email notifications - https://www.emailjs.com/)
- GitHub repository connected to Vercel

## Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://cloud.mongodb.com/
   - Sign up or log in

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "Shared" (Free tier)
   - Select a cloud provider and region (preferably closest to your Vercel deployment region)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `academix-admin` (or your choice)
   - Password: Generate a strong password (SAVE THIS!)
   - User Privileges: Select "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Addresses**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
   - **Note**: This is required for Vercel serverless functions

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" as driver and version "4.1 or later"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name before the `?`: `...mongodb.net/academix-db?retryWrites...`

## Step 2: EmailJS Setup (Optional)

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up and verify your email

2. **Add Email Service**
   - Go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - **Save the Service ID** (e.g., `service_xxxxxxx`)

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:
     ```
     Subject: New Booking Request from {{from_name}}

     New booking request from Academix website:

     Name: {{from_name}}
     Email: {{from_email}}
     Phone: {{phone}}
     Subject: {{subject}}
     Session Type: {{session_type}}
     Preferred Date: {{preferred_date}}
     Preferred Time: {{preferred_time}}

     Message:
     {{message}}
     ```
   - **Save the Template ID** (e.g., `template_xxxxxxx`)

4. **Get API Keys**
   - Go to "Account" → "General"
   - **Save the Public Key** (e.g., `user_xxxxxxxxxxxxxxx`)
   - Go to "Account" → "API Keys"
   - **Save the Private Key** (e.g., `xxxxxxxxxxxxxxxxxxxxxxxx`)

## Step 3: Vercel Environment Variables

1. **Go to Your Vercel Project**
   - Open https://vercel.com/
   - Select your "Academix" project

2. **Add Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add the following variables:

   ### Required Variables:

   **MONGODB_URI**
   - Value: Your MongoDB connection string from Step 1.5
   - Example: `mongodb+srv://academix-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/academix-db?retryWrites=true&w=majority`
   - Environments: Production, Preview, Development ✓

   ### Optional Variables (for EmailJS):

   **EMAILJS_SERVICE_ID**
   - Value: Your EmailJS Service ID from Step 2.2
   - Environments: Production, Preview, Development ✓

   **EMAILJS_TEMPLATE_ID**
   - Value: Your EmailJS Template ID from Step 2.3
   - Environments: Production, Preview, Development ✓

   **EMAILJS_PUBLIC_KEY**
   - Value: Your EmailJS Public Key from Step 2.4
   - Environments: Production, Preview, Development ✓

   **EMAILJS_PRIVATE_KEY**
   - Value: Your EmailJS Private Key from Step 2.4
   - Environments: Production, Preview, Development ✓

3. **Click "Save" for each variable**

## Step 4: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)

1. **Connect GitHub Repository**
   - In Vercel, click "Add New" → "Project"
   - Import your GitHub repository (fahdmaa/Academix)
   - Click "Import"

2. **Configure Project Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Click "Deploy"

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd c:\Users\Fahd\Documents\OUIIPROF
   vercel --prod
   ```

## Step 5: Verify Deployment

1. **Check Build Logs**
   - In Vercel dashboard, go to your project
   - Click on the latest deployment
   - Check "Build Logs" for any errors

2. **Test the Website**
   - Open your deployment URL (e.g., https://academix.vercel.app)
   - Test language switching (FR/EN)
   - Test theme switching (Light/Dark)
   - Submit a test form to verify MongoDB connection

3. **Verify MongoDB**
   - Go to MongoDB Atlas dashboard
   - Click "Browse Collections"
   - Check if `academix-db` database exists
   - Check if `form_submissions` collection has your test entry

4. **Verify Email (if configured)**
   - Check your email (fahd.maatoug@outlook.fr)
   - You should receive an email notification for the test form submission

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Ensure all dependencies are in `package.json`
- Verify `vercel.json` is correct

### MongoDB Connection Error
- Verify MONGODB_URI is correct
- Check if IP whitelist includes 0.0.0.0/0
- Ensure database user has correct permissions

### Form Submission Fails
- Check browser console for errors
- Verify API endpoint is accessible: `https://your-domain.vercel.app/api/submit-form`
- Check Vercel function logs

### Email Not Sending
- Verify all EmailJS environment variables are set
- Check EmailJS dashboard for logs
- Test email template in EmailJS dashboard

## Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to Settings → Domains
   - Add your custom domain (e.g., academix.me)
   - Follow DNS configuration instructions
   - Wait for DNS propagation (can take up to 48 hours)

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://www.mongodb.com/docs/atlas/
- EmailJS Documentation: https://www.emailjs.com/docs/

---

**Created by Claude Code**
Last Updated: 2025-10-06
