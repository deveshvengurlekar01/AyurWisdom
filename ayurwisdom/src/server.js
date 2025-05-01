const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection to AyurWisdom database
mongoose.connect('mongodb://localhost:27017/AyurWisdom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected to AyurWisdom database');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define Feedback schema (stored under feedbackApp collection)
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  yourcomments: { type: String, required: true },
  yourfeedback: { type: String, required: true },
});

const Feedback = mongoose.model('feedback', feedbackSchema, 'feedbackApp'); // "feedbackApp" is the collection name

// POST route for submitting feedback
app.post('/feedback', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging: log the incoming request body

    const { name, email, yourcomments, yourfeedback } = req.body;

    if (!name || !email || !yourcomments || !yourfeedback) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({
      name,
      email,
      yourcomments,
      yourfeedback,
    });

    await newFeedback.save();

    console.log('Feedback saved to the database'); // Debugging: log success

    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error); // Debugging: log error
    res.status(500).json({ error: 'Error saving feedback' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});