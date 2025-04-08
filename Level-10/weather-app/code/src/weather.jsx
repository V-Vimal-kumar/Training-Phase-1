import React from 'react';
import './weather.css';

const iconMap = {
  "01d": "sunny.png",
  "01n": "cloud.png",
  "02d": "cloud.png",
  "02n": "cloud.png",
  "03d": "cloud.png",
  "03n": "cloud.png",
  "04d": "cloud.png",
  "04n": "cloud.png",
  "09d": "Rainy.png",
  "09n": "Rainy.png",
  "10d": "Rainy.png",
  "10n": "Rainy.png",
  "11d": "storm.png",
  "11n": "storm.png",
  "13d": "snow.png",
  "13n": "snow.png",
  "50d": "wind.png",
  "50n": "wind.png"
};

function Weather({ data }) {
  if (!data || !data.main) return <p>Loading weather...</p>;

  return (
    <div className="weather-section-clean">
      <img
        src={`./icons/${iconMap[data.weather[0].icon]}`}
        alt={data.weather[0].description}
        className="weather-icon-clean"
      />
      <p className="temp">{Math.round(data.main.temp)}°C</p>
      <p className="city">{data.city}</p>

      <div className="details">
        <h3>Details</h3>
        <div className="detail-item">
          <span>Feels like:</span>
          <span>{Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span>Wind:</span>
          <span>{data.wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span>Humidity:</span>
          <span>{data.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>Pressure:</span>
          <span>{data.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;
