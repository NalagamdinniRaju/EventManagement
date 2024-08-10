const axios = require('axios');

exports.getWeather = async (location) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: location,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    return {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};