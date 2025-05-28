# EmailJS Template Configuration Fix

## The Problem
EmailJS is not sending emails because the template needs to be configured correctly.

## Solution: Update Your EmailJS Template

1. **Login to EmailJS Dashboard**
   - Go to: https://dashboard.emailjs.com/
   - Login with your credentials

2. **Open Your Template**
   - Click on "Email Templates"
   - Find and click on template: `template_ng68h4w`

3. **Update the Template Content**

Replace your current template with this exact content:

**Subject Field:**
```
New Contact from {{fullName}} - OUIIPROF
```

**Content Field:**
```html
<h2>New Contact Form Submission</h2>

<p><strong>Name:</strong> {{fullName}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>City:</strong> {{city}}</p>
<p><strong>Method:</strong> {{method}}</p>
<p><strong>Hours:</strong> {{hours}}</p>
<p><strong>Subjects:</strong> {{subjects}}</p>

<hr>

<p><strong>Message:</strong><br>
{{message}}</p>

<hr>
<p style="color: #666; font-size: 12px;">
This email was sent from OUIIPROF contact form.
</p>
```

4. **CRITICAL: Set the Recipients**

In the template settings, you MUST set:

- **To Email:** `{{to_email}}`  (This uses the email from our JavaScript)
- **From Name:** `{{from_name}}`
- **Reply To:** `{{from_email}}`

OR if that doesn't work:

- **To Email:** `fahd.maatoug9@gmail.com` (Your actual email)
- **From Name:** `OUIIPROF Contact Form`
- **Reply To:** `{{email}}`

5. **Save the Template**

## Testing Your Fix

1. Open `test-email.html` in your browser
2. Open the browser console (F12)
3. Click each test button and check:
   - Console for detailed error messages
   - Your email inbox
   - Your spam folder

## Common Issues and Fixes

### Issue 1: "The template parameters are invalid"
- This means your template has variables that aren't being sent
- Solution: Use the template content above exactly

### Issue 2: "The recipient address is invalid"
- The "To Email" field in template is not set correctly
- Solution: Set it to `{{to_email}}` or your actual email

### Issue 3: No error but no email
- Check spam folder
- Verify email service is connected in EmailJS
- Check EmailJS dashboard for logs

## Alternative Simple Template

If the above doesn't work, try this minimal template:

**Subject:**
```
Contact Form - OUIIPROF
```

**Content:**
```
Name: {{fullName}}
Email: {{email}}
Phone: {{phone}}
City: {{city}}
Method: {{method}}
Hours: {{hours}}
Subjects: {{subjects}}
```

**To Email:** `fahd.maatoug9@gmail.com` (hardcode your email)

## Need More Help?

1. Check EmailJS logs: Dashboard → Email History
2. Use the test page: `test-email.html`
3. Contact EmailJS support with your template ID