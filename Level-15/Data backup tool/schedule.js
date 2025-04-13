import schedule from 'node-schedule';
import { performBackup } from './backup.js';
import config from './config.js';
import { log } from './logger.js';

export function setupSchedule() {
  schedule.scheduleJob(config.schedule, () => {
    log('Scheduled backup started.');
    performBackup();
  });
}
