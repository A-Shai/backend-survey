const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // For loading environment variables

// Supabase client setup
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
console.log("Using Supabase URL:", supabaseUrl);
console.log("Using Supabase Key:", supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize express app
const app = express();

// Middleware setup
app.use(cors());  // Enable CORS for all origins (you can restrict it if needed)
app.use(bodyParser.json());  // Parse incoming JSON requests

// Handle POST request to submit form data
app.post('/submit-form', async (req, res) => {
  const { companyName, email, contactPerson, answers, score } = req.body;

  try {
    // Log the incoming data (for debugging purposes)
    console.log('Received form data:', req.body);

    // Insert the data into Supabase
    const { data, error } = await supabase
      .from('survey_responses')
      .insert([
        {
          company_name: companyName,
          email: email,
          contact_person: contactPerson,
          answers: JSON.stringify(answers),  // Convert answers to JSON string if needed
          score: score,
        },
      ]);

    // If there is an error inserting the data into Supabase, handle it
    if (error) {
      console.error('Error inserting data into Supabase:', error);
      return res.status(500).json({ message: 'Error saving data to database', error: error.message });
    }

    // Respond with success if the data was inserted successfully
    res.status(200).json({
      message: 'Form submitted successfully and data saved to database!',
      data: data,
    });
  } catch (error) {
    // Catch any unexpected errors
    console.error('Error processing form submission:', error);
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
});

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
