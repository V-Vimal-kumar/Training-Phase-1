import { performBackup } from './backup.js';
import { setupSchedule } from './schedule.js';
import fs from 'fs-extra';
import config from './config.js';
import path from 'path';

await fs.ensureDir(config.backupDir);
await fs.ensureDir(path.dirname(config.logFile));

await performBackup();

setupSchedule();
