//import logo from './logo.svg';
import './App.css';
import './index.css';

// src/App.js
import React, { useState, useEffect } from 'react';
// Make sure to remove any other imports like './logo.svg' or './App.css' if they were there.

// Main App component for the Weather Application
const App = () => {
  // State to store the city entered by the user
  const [city, setCity] = useState('');
  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);
  // State to manage loading status during API calls
  const [loading, setLoading] = useState(false);
  // State to store any error messages
  const [error, setError] = useState('');

  // IMPORTANT: Your provided API key has been placed here.
  // You can get a free API key by signing up at https://openweathermap.org/api
  const API_KEY = 'c5c97545a5cf20175cb1c3ed75bc3a55'; // Your provided API key

  // useEffect to check for API key on component mount
  useEffect(() => {
    if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY' || !API_KEY) {
      setError('Please replace "YOUR_OPENWEATHERMAP_API_KEY" in the code with your actual API key from OpenWeatherMap. See https://openweathermap.org/api for more info.');
    }
  }, []); // Empty dependency array means this runs once on mount

  // Function to fetch weather data from OpenWeatherMap API
  const fetchWeather = async () => {
    // Clear previous error and set loading to true
    setError('');
    setLoading(true);
    setWeatherData(null); // Clear previous weather data

    if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY' || !API_KEY) {
      setError('Please replace "YOUR_OPENWEATHERMAP_API_KEY" in the code with your actual API key from OpenWeatherMap. See https://openweathermap.org/api for more info.');
      setLoading(false);
      return;
    }

    if (!city) {
      setError('Please enter a city name.');
      setLoading(false);
      return;
    }

    try {
      // Construct the API URL with the city, API key, and units (metric for Celsius)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      // Check if the response is OK (status 200)
      if (!response.ok) {
        // If not OK, parse the error message from the API response
        const errorData = await response.json();
        throw new Error(errorData.message || 'City not found or API error.');
      }

      const data = await response.json();
      setWeatherData(data); // Set the fetched data to state
    } catch (err) {
      // Catch and set any errors during the fetch operation
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      console.error("Error fetching weather data:", err);
    } finally {
      // Always set loading to false after the fetch operation completes
      setLoading(false);
    }
  };

  // Function to handle input change in the city search field
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Function to handle the search button click
  const handleSearchClick = () => {
    fetchWeather();
  };

  // Function to handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    // Main container for the weather app, styled with Tailwind CSS
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          <span role="img" aria-label="sun">☀️</span> Weather App
        </h1>

        {/* City input and search button section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter city name..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={city}
            onChange={handleCityChange}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:-translate-y-0.5"
          >
            Get Weather
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="text-center text-gray-700 text-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700 mx-auto mb-2"></div>
            Loading weather data...
          </div>
        )}

        {/* Error message display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-center">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Weather data display */}
        {weatherData && (
          <div className="text-center mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <div className="flex items-center justify-center mb-4">
              {/* Weather icon */}
              {weatherData.weather && weatherData.weather[0] && (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                  className="w-20 h-20"
                />
              )}
              {/* Temperature */}
              <p className="text-6xl font-extrabold text-gray-900 ml-2">
                {Math.round(weatherData.main.temp)}°C
              </p>
            </div>
            {/* Weather description */}
            <p className="text-2xl text-gray-700 capitalize mb-4">
              {weatherData.weather[0].description}
            </p>

            {/* Additional weather details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg text-gray-600">
              <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                <p className="font-semibold">Humidity:</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                <p className="font-semibold">Wind Speed:</p>
                <p>{weatherData.wind.speed} m/s</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                <p className="font-semibold">Feels Like:</p>
                <p>{Math.round(weatherData.main.feels_like)}°C</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                <p className="font-semibold">Pressure:</p>
                <p>{weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
