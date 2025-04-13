const fs = require('fs');

const fileToWatch = 'sample.txt';

try {
  fs.watch(fileToWatch, (eventType, filename) => {
    if (filename) {
      console.log(`The file "${filename}" was ${eventType}.`);
    } else {
      console.log(`Something happened to "${fileToWatch}", but filename is not available.`);
    }
  });

  console.log(`Watching for changes on "${fileToWatch}"...`);
} catch (err) {
  console.error('Error watching file:', err.message);
}
