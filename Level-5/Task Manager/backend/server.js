const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// ✅ Use 'name' instead of 'task'
const schema = new mongoose.Schema({
    name: String,
    category: String,
    dueDate: String
});

const Task = mongoose.model("Task", schema);

// Get all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Create a new task
app.post("/tasks", async (req, res) => {
    const { name, category, dueDate } = req.body; 
    const newTask = new Task({ name, category, dueDate });
    await newTask.save();
    res.json(newTask);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    const { name, category, dueDate } = req.body; 
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { name, category, dueDate },
        { new: true }
    );
    res.json(updatedTask);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
