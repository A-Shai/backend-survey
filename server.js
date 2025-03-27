// Importing required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();

// Middleware for CORS
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests from React app on localhost:3000
  methods: 'GET,POST',              // Allow GET and POST requests
  allowedHeaders: 'Content-Type',   // Allow the 'Content-Type' header
};

app.use(cors(corsOptions));  // Apply CORS settings to all routes
app.use(bodyParser.json());  // Parse incoming JSON data

// POST endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const { companyName, email, contactPerson, answers, score } = req.body;

  console.log('Received form data:', req.body);

  // Here you can save the form data to your database (e.g., Supabase or Firebase)

  // Sending back a response
  res.json({
    message: 'Form submitted successfully!',
    data: { companyName, email, contactPerson, answers, score },
  });
});

// Start the server on port 5000 (or any port of your choice)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
