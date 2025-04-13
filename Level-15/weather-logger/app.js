import { connectDB } from './utils/db.js';
import { fetchWeather } from './services/weatherService.js';

await connectDB();

fetchWeather();
setInterval(fetchWeather, 600000);
