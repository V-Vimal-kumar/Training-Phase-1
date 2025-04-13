import fs from 'fs';
import chalk from 'chalk';
import config from './config.js';

export function log(message) {
  const time = new Date().toISOString();
  const logMsg = `[${time}] ${message}\n`;
  fs.appendFileSync(config.logFile, logMsg);
  console.log(chalk.green(logMsg.trim()));
}
