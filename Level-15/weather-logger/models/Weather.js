import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  description: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Weather = mongoose.model('Weather', weatherSchema);
export default Weather;
