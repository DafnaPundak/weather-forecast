const Weather = require('../models/Weather');
const axios = require('axios');

// Fetch weather data from API and save it to the database
exports.getWeatherData = async (req, res) => {
  try {
    const {
      city
    } = req.body;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`);

    // Extract necessary data, including the icon code
    const weatherData = {
      city: city,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon // Extract icon code
    };

    // Save weather data to the database
    const weather = new Weather(weatherData);
    await weather.save();

    // Fetch all saved searches
    const allWeatherData = await Weather.find();
    res.render('weather', {
      weather: weather,
      weatherData: allWeatherData
    });
  } catch (err) {
    console.error('Error fetching weather data:', err.message);
    res.status(500).send('Error fetching weather data');
  }
};

// Fetch all saved weather searches
exports.getAllWeather = async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.render('weather', {
      weather: null,
      weatherData: weatherData
    });
  } catch (err) {
    res.status(500).send('Error retrieving weather data');
  }
};

// Delete a weather search from the database
exports.deleteWeather = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await Weather.findByIdAndDelete(id);
    res.redirect('/weather/all'); // Redirect to view all searches after deletion
  } catch (err) {
    res.status(500).send('Error deleting weather data');
  }
};