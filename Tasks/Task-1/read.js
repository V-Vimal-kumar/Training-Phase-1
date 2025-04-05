const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
  if (err) {
    console.error( err.message);
    return;
  }
  console.log('📄 File Contents:\n');
  console.log(data);
});
