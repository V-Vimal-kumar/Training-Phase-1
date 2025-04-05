const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'sample.txt');
const destinationPath = path.join(__dirname, 'copy.txt');

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

const totalSize = fs.statSync(sourcePath).size;
let copiedSize = 0;

readStream.on('data', (chunk) => {
  copiedSize += chunk.length;
  const percent = ((copiedSize / totalSize) * 100).toFixed(2);
  process.stdout.write(`\rProgress: ${percent}%`);
});

readStream.on('error', (err) => {
  console.error('\n❌ Error reading file:', err);
});

writeStream.on('error', (err) => {
  console.error('\n❌ Error writing file:', err);
});

writeStream.on('close', () => {
  console.log('\n✅ File copy complete.');
});

readStream.pipe(writeStream);
