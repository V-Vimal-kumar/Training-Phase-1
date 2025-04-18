const fs = require('fs');

const content = 'This is written by me! ';

fs.writeFile('output.txt', content, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File written successfully.');
  }
});
