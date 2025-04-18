const fs = require('fs');
const path = require('path');

function readDirectoryRecursive(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        console.log(`📁 Directory: ${fullPath}`);
        readDirectoryRecursive(fullPath); 
      } else if (stats.isFile()) {
        console.log(`📄 File: ${fullPath}`);
      }
    });

  } catch (err) {
    console.error('Error reading directory:', err.message);
  }
}

const startPath = 'C:/Users/vimal/OneDrive/Documents/Training Phase-1/Level-12/Tasks/Task-11';

console.log(`Reading contents of: ${startPath}`);
readDirectoryRecursive(startPath);
