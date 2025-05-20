import crypto from 'crypto';
import fs from 'fs';

export const encryptFile = (inputPath, outputPath, password, algorithm = 'aes-256-cbc') => {
  const key = crypto.scryptSync(password, 'salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  output.write(iv); 

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    console.log('File encrypted successfully!');
  });

  output.on('error', err => {
    console.error('Encryption failed:', err.message);
  });
};
