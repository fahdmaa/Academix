# EmailJS Setup Guide for OUIIPROF

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up Free"
3. Create your account

## Step 2: Create Email Service
1. In your dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. Name it (e.g., "ouiiprof_service")
6. Save the Service ID

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Set up your template:

**Template Name:** Contact Form Submission

**Subject:** New Contact from {{fullName}} - OUIIPROF

**Content:**
```
You have received a new contact form submission:

Name: {{fullName}}
Email: {{email}}
Phone: {{phone}}
City: {{city}}
Method: {{method}}
Hours: {{hours}}
Subjects: {{subjects}}

---
Best regards,
OUIIPROF Contact System
```

4. Save and note the Template ID

## Step 4: Get Your Credentials
1. Go to "Integration" → "API Keys"
2. Copy your Public Key (User ID)

## Step 5: Configure Your Website
Add these to your website (keep them secure):
- Service ID: [YOUR_SERVICE_ID]
- Template ID: [YOUR_TEMPLATE_ID]
- Public Key: [YOUR_PUBLIC_KEY]

## Important Notes:
- Free plan: 200 emails/month
- Keep your credentials secure
- Test in development first
- Consider upgrading if you need more emails

## For Storing Submissions:
Since EmailJS doesn't store submissions, we'll implement:
1. Browser localStorage for temporary storage
2. Option to export as CSV
3. Send a copy to yourself for records