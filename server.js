require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post("/submit", async (req, res) => {
  const { company_name, email, contact_person, answers } = req.body;

  const { data, error } = await supabase.from("survey_responses").insert([
    { company_name, email, contact_person, answers: JSON.stringify(answers) },
  ]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "Survey submitted successfully", data });
});

app.listen(5000, () => console.log("Server running on port 5000"));

