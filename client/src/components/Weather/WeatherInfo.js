import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const WeatherInfo = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    try {
      const response = await api.get(`/weather/${location}`);
      setWeather(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading weather...</div>;
  }

  if (!weather) {
    return <div>Weather information not available</div>;
  }

  return (
    <div className="weather-info">
      <h3>Weather in {location}</h3>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.description}</p>
    </div>
  );
};

export default WeatherInfo;