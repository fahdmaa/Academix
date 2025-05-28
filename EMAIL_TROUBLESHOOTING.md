# EmailJS Troubleshooting Guide

## Why You're Not Receiving Emails

If form submissions appear in the admin panel but you're not receiving emails, here are the most common issues:

### 1. **Check EmailJS Template Configuration**

Log into your EmailJS account and verify your template:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click on "Email Templates"
3. Open template `template_ng68h4w`
4. Make sure the template contains these variables:
   - `{{fullName}}`
   - `{{email}}`
   - `{{phone}}`
   - `{{city}}`
   - `{{method}}`
   - `{{hours}}`
   - `{{subjects}}`

5. **IMPORTANT**: Set the "To Email" field to your email address

### 2. **Update Your Email Address**

In `script.js`, update line 901:
```javascript
to_email: 'your-email@gmail.com', // Replace with your actual email
```

### 3. **Check Email Service Configuration**

1. In EmailJS Dashboard, go to "Email Services"
2. Open service `service_s1m3yzm`
3. Make sure it's properly connected to your email provider
4. If using Gmail, ensure:
   - Less secure app access is enabled, OR
   - You're using an App Password (recommended)

### 4. **Gmail Specific Setup**

If using Gmail:
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable it)
3. Security → App passwords
4. Generate an app password for "Mail"
5. Use this password in EmailJS service configuration

### 5. **Check Spam Folder**

Emails might be going to spam. Check your spam/junk folder.

### 6. **Test EmailJS Directly**

Use EmailJS test feature:
1. Go to your template in EmailJS
2. Click "Test It"
3. Fill in test values
4. Click "Send Test Email"

### 7. **Check Browser Console**

Open browser console (F12) when submitting the form:
- Look for any error messages
- Check if EmailJS returns success or error

## Quick Fix Checklist

- [ ] Update `to_email` in script.js with your email
- [ ] Verify template has correct variable names
- [ ] Check email service is connected
- [ ] Look in spam folder
- [ ] Test template directly in EmailJS
- [ ] Check browser console for errors