const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Handle form submissions for fetching weather data
router.post('/', weatherController.getWeatherData);

// View all saved weather searches
router.get('/all', weatherController.getAllWeather);

// Delete a specific weather search
router.get('/delete/:id', weatherController.deleteWeather);

module.exports = router;
