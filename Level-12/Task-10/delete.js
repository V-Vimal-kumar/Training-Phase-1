const fs = require('fs');

const fileToDelete = 'deleteMe.txt';

if (fs.existsSync(fileToDelete)) {
  fs.unlink(fileToDelete, (err) => {
    if (err) {
      console.error('Error deleting file:', err.message);
    } else {
      console.log(`File "${fileToDelete}" was successfully deleted.`);
    }
  });
} else {
  console.log(`File "${fileToDelete}" does not exist.`);
}
