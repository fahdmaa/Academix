// Simple Node.js test server for MongoDB backend
import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://Academix-admin:VwCCtasgkklQArow@academix-cluster.nacfctb.mongodb.net/academix-db?retryWrites=true&w=majority&appName=academix-cluster';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  console.log('✅ Connected to MongoDB Atlas');
  return client;
}

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint
app.post('/api/submit-form', async (req, res) => {
  try {
    console.log('📥 Received form submission:', req.body);

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

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db('academix-db');
    const collection = db.collection('form_submissions');

    // Prepare document
    const document = {
      ...formData,
      createdAt: new Date(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      status: 'pending'
    };

    // Insert into MongoDB
    const result = await collection.insertOne(document);

    console.log('✅ Saved to MongoDB:', result.insertedId);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        id: result.insertedId,
        timestamp: document.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);

    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MongoDB test server running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/submit-form`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health\n`);
});
