const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'tasks.json');

async function readTasks() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writeTasks(tasks) {
  try {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error writing to file:', err.message);
  }
}

module.exports = {
  readTasks,
  writeTasks
};
