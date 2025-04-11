import crypto from 'crypto';
import fs from 'fs';

export const decryptFile = (inputPath, outputPath, password, algorithm = 'aes-256-cbc') => {
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  const iv = Buffer.alloc(16);
  input.read(16); 
  input.once('readable', () => {
    const iv = input.read(16);
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    input.pipe(decipher).pipe(output);

    output.on('finish', () => {
      console.log('File decrypted successfully!');
    });

    output.on('error', err => {
      console.error('Decryption failed:', err.message);
    });
  });
};
