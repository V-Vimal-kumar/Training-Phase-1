const fs = require('fs');
const os = require('os');
const path = require('path');

const tempDirPrefix = path.join(os.tmpdir(), 'my-temp-');

fs.mkdtemp(tempDirPrefix, (err, folder) => {
  if (err) return console.error('Error creating temp directory:', err);

  console.log('Temporary directory created at:', folder);

  for (let i = 1; i <= 3; i++) {
    const filePath = path.join(folder, `tempFile${i}.txt`);
    const content = `This is temporary file number ${i}.`;

    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error(`Failed to write ${filePath}:`, err);
      } else {
        console.log(`Created: ${filePath}`);
      }
    });
  }
});
