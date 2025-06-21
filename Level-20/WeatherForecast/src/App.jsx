import React, { useState, useEffect } from 'react';
import Weather from './weather';
import Search from './search';
import Forcast from './forcast';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const DEFAULT_CITY = {
    value: "13.0827 80.2707", 
    label: "Chennai, IN"
  };

  const handleOnChange = (searchData) => {
    if (!searchData?.value || typeof searchData.value !== 'string') {
      console.error('Invalid searchData.value:', searchData.value);
      return;
    }

    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          handleOnChange({
            value: `${lat} ${lon}`,
            label: "Your Location"
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          handleOnChange({
            value: "13.0827 80.2707", // fallback to Chennai
            label: "Chennai, IN"
          });
        }
      );
    } else {
      handleOnChange({
        value: "13.0827 80.2707",
        label: "Chennai, IN"
      });
    }
  }, []);


  return (
    <div className="app">
      <Search onSearchChange={handleOnChange} />
      {(currentWeather || forecast) && (
        <div className="main-container">
          <Forcast data={forecast} />
          <Weather data={currentWeather} />
        </div>
      )}
    </div>
  );
}

export default App;
