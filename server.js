const express = require('express');
const cors = require('cors');
const app = express();

// Allow requests from your GitHub Pages domain (replace with your actual domain)
app.use(cors({
  origin: "https://a-shai.github.io",  // Replace with your GitHub Pages URL
}));

// Middleware to parse JSON requests
app.use(express.json());

// Handle POST requests to /submit-form
app.post("/submit-form", (req, res) => {
  const formData = req.body;  // Get the form data sent from the React app
  console.log("Form Data:", formData);

  // Process the form data or save it to a database, etc.

  res.status(200).send("Form data received successfully");
});

// Server is listening on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
