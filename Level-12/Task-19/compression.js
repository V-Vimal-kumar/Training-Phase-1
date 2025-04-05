const fs = require('fs');
const zlib = require('zlib');

function compressFile(input, output) {
  const readStream = fs.createReadStream(input);
  const writeStream = fs.createWriteStream(output);
  const gzip = zlib.createGzip();

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(` Compressed to: ${output}`);
    })
    .on('error', (err) => {
      console.error(' Compression error:', err);
    });
}

function decompressFile(input, output) {
  const readStream = fs.createReadStream(input);
  const writeStream = fs.createWriteStream(output);
  const gunzip = zlib.createGunzip();

  readStream
    .pipe(gunzip)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(`✅ Decompressed to: ${output}`);
    })
    .on('error', (err) => {
      console.error('❌ Decompression error:', err);
    });
}

const originalFile = 'test.txt';
const compressedFile = 'testfile.txt.gz';
const decompressedFile = 'decompressed.txt';

compressFile(originalFile, compressedFile);

setTimeout(() => {
  decompressFile(compressedFile, decompressedFile);
}, 2000);
