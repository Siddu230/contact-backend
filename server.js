const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins (or specify your frontend origin)
app.use(cors()); // This allows requests from all origins

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory array to store form submissions
let formSubmissions = [];

// POST endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation to ensure all fields are present
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Store the form data in the in-memory array
    formSubmissions.push({ name, email, message });

    // Send a success response
    res.status(200).json({ success: true, message: 'Form submitted successfully' });
    console.log('Form submission received:', { name, email, message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});