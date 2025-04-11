import inquirer from 'inquirer';
import { encryptFile } from './utils/encrypt.js';
import { decryptFile } from './utils/decrypt.js';

const main = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: ['Encrypt a file', 'Decrypt a file']
  });

  const { inputPath, outputPath, password, algorithm } = await inquirer.prompt([
    {
      type: 'input',
      name: 'inputPath',
      message: 'Enter input file path:',
    },
    {
      type: 'input',
      name: 'outputPath',
      message: 'Enter output file path:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password:',
    },
    {
      type: 'input',
      name: 'algorithm',
      message: 'Enter encryption algorithm (default: aes-256-cbc):',
      default: 'aes-256-cbc'
    }
  ]);

  if (action === 'Encrypt a file') {
    encryptFile(inputPath, outputPath, password, algorithm);
  } else {
    decryptFile(inputPath, outputPath, password, algorithm);
  }
};

main();
