import axios from 'axios';
import dotenv from 'dotenv';
import Weather from '../models/Weather.js';

dotenv.config();

export const fetchWeather = async () => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${process.env.CITY}&appid=${process.env.API_KEY}&units=metric`
    );

    const data = res.data;

    const weather = new Weather({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description
    });

    await weather.save();
    console.log(`[${new Date().toISOString()}] Weather saved: ${weather.city}, ${weather.temperature}°C`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Fetch failed:`, err.message);
  }
};
