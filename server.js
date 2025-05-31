const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory array to store form submissions
let formSubmissions = [];

// Root route for GET requests
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Contact Form Backend! Use POST /submit-form to submit data or GET /submissions to view submissions.');
});

// POST endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Log the received data to the console
    console.log('Received form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Basic validation to ensure all fields are present
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Store the form data in the in-memory array
    formSubmissions.push({ name, email, message });

    // Send a success response
    res.status(200).json({ success: true, message: 'Form submitted successfully' });
});

// GET endpoint to retrieve all form submissions
app.get('/submissions', (req, res) => {
    res.status(200).json(formSubmissions);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});