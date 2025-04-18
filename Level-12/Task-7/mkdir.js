const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'Output');

if (fs.existsSync(dirPath)) {
  console.log('Directory already exists.');
} else {
  fs.mkdir(dirPath, (err) => {
    if (err) {
      console.error('Error creating directory:', err.message);
      return;
    }
    console.log('Directory "output" created successfully.');
  });
}
