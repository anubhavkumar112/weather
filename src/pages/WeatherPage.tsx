import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiWind } from 'react-icons/bi';
import { WiHumidity } from 'react-icons/wi';
import { HiOutlineRss } from 'react-icons/hi';
import './WeatherPage.css'; // Import external CSS file

const WeatherPage: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [weather, setWeather] = useState<any>(null);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    fetchWeatherData();
  }, [city, unit]);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'e57086b3785ecdbe574d0e234497d9c9';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      // Handle error state appropriately
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
  };

  const convertTemperature = (temp: number) => {
    return unit === 'metric' ? temp.toFixed(1) + '°C' : ((temp * 9/5 + 32).toFixed(1)) + '°F';
  };
  
  const convertWindSpeed = (speed: number) => {
    return unit === 'metric' ? speed.toFixed(1) + ' m/s' : (speed * 2.237).toFixed(1) + ' mph';
  };

  return (
    <div className="weather-container bg-gray-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">Weather in {city}</h1>
      {weather ? (
        <div className="weather-info">
          <p className="text-xl mb-2">Temperature: {convertTemperature(weather.main.temp)}</p>
          <p className="text-xl mb-2">Description: {weather.weather[0].description}</p>
          <p className="text-xl mb-2 flex items-center"><WiHumidity className="mr-2"/>Humidity: {weather.main.humidity}%</p>
          <p className="text-xl mb-2 flex items-center"><BiWind className="mr-2"/>Wind Speed: {convertWindSpeed(weather.wind.speed)}</p>
          <p className="text-xl mb-2 flex items-center"><HiOutlineRss className="mr-2"/>Pressure: {weather.main.pressure} hPa</p>
          <button className="unit-button mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={() => handleUnitChange(unit === 'metric' ? 'imperial' : 'metric')}>
            Change to {unit === 'metric' ? 'Imperial' : 'Metric'}
          </button>
          {/* Weather Icon */}
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" className="mt-4"/>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherPage;
