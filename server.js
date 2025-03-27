// Importing the necessary packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js"); // Import Supabase client

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json()); // Parse JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Supabase credentials from .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define a basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Survey Backend!");
});

// API route to handle form submissions
app.post("/submit-form", async (req, res) => {
  const { companyName, email, contactPerson, answers } = req.body; // Extract data from request body
  
  // Save data to Supabase (adjust the table name and columns as per your schema)
  const { data, error } = await supabase
    .from("survey_responses") // This is the table in Supabase
    .insert([
      { company_name: companyName, email: email, contact_person: contactPerson, answers: answers }
    ]);

  if (error) {
    return res.status(500).json({ error: "Error inserting data into Supabase", details: error });
  }

  // Send success response
  res.status(200).json({ message: "Data successfully submitted!", data });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
