import fs from 'fs-extra';
import path from 'path';
import config from './config.js';
import { getTimestamp } from './utils.js';
import { log } from './logger.js';

export async function performBackup() {
  try {
    const timestamp = getTimestamp();
    const dest = path.join(config.backupDir, `backup-${timestamp}`);
    await fs.copy(config.sourceDir, dest);
    log(`Backup created at ${dest}`);

    const backups = (await fs.readdir(config.backupDir))
      .filter(name => name.startsWith('backup-'))
      .sort();

    if (backups.length > config.maxBackups) {
      const toDelete = backups.slice(0, backups.length - config.maxBackups);
      for (const folder of toDelete) {
        const fullPath = path.join(config.backupDir, folder);
        await fs.remove(fullPath);
        log(`Old backup removed: ${fullPath}`);
      }
    }
  } catch (err) {
    log(`Backup failed: ${err.message}`);
  }
}
