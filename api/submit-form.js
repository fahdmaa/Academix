// Vercel Serverless Function for form submission
import clientPromise from '../lib/mongodb.js';

// EmailJS integration (optional - for sending email notifications)
async function sendEmailNotification(formData) {
  try {
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        session_type: formData.sessionType,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        message: formData.message || 'Aucun message additionnel',
        to_email: 'fahd.maatoug@outlook.fr'
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('EmailJS request failed');
    }

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please use POST.'
    });
  }

  try {
    const formData = req.body;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'subject', 'sessionType', 'preferredDate', 'preferredTime'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('academix-db');
    const collection = db.collection('form_submissions');

    // Prepare document for MongoDB
    const document = {
      ...formData,
      createdAt: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      status: 'pending'
    };

    // Insert into MongoDB
    const result = await collection.insertOne(document);

    // Send email notification (if EmailJS is configured)
    let emailResult = { success: false };
    if (process.env.EMAILJS_SERVICE_ID) {
      emailResult = await sendEmailNotification(formData);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        id: result.insertedId,
        email_sent: emailResult.success,
        timestamp: document.createdAt
      }
    });

  } catch (error) {
    console.error('Error processing form submission:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}
