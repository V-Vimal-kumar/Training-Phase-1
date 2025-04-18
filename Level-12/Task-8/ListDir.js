const fs = require('fs');
const path = require('path');

const directoryPath = 'C:/Users/vimal/OneDrive/Documents/Training Phase-1/Level-12/Tasks';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err.message);
    return;
  }

  files.forEach(file => {
    const fullPath = path.join(directoryPath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      console.log(`[DIR]  ${file}`);
    } else {
      console.log(`[FILE] ${file}`);
    }
  });
});
