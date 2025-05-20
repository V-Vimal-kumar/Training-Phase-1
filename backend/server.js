require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  date: String,
  text: String,
  priority: Boolean,
});

const Event = mongoose.model("Event", eventSchema);

app.post("/events", async (req, res) => {
  const { date, text, priority } = req.body;
  const newEvent = new Event({ date, text, priority });
  await newEvent.save();
  res.json(newEvent);
});

app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.delete("/events/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

app.put("/events/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  event.priority = !event.priority;
  await event.save();
  res.json(event);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
