const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const weatherRoutes = require('./routes/weatherRoutes'); // Your routes

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.set('view engine', 'ejs'); // or 'hbs' if using Handlebars
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions

// Routes
app.use('/weather', weatherRoutes);

// Main route
app.get('/', (req, res) => {
    res.redirect('/weather/all'); // Redirect to view all saved searches
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
