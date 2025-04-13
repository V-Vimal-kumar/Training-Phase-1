import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  category: { type: String, required: true },
  target: { type: Number, required: true },
  current: { type: Number, default: 0 }
});

export default mongoose.model('Goal', goalSchema);
