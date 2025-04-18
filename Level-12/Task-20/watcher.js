const fs = require('fs');
const path = require('path');

const folderToWatch = path.join(__dirname, 'folder');
const logFilePath = path.join(__dirname, 'logs.txt');

function logEvent(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error(' Failed to write to log:', err);
  });

  console.log(logMessage.trim());
}

try {
  fs.watch(folderToWatch, { persistent: true }, (eventType, filename) => {
    if (filename) {
      const fullPath = path.join(folderToWatch, filename);

      setTimeout(() => {
        fs.stat(fullPath, (err, stats) => {
          if (err) {
            logEvent(`File deleted: ${filename}`);
          } else {
            if (stats.isFile()) {
              const action = eventType === 'rename' ? 'created/renamed' : 'modified';
              logEvent(`File ${action}: ${filename}`);
            } else if (stats.isDirectory()) {
              logEvent(`Directory ${eventType}: ${filename}`);
            }
          }
        });
      }, 100);
    }
  });

  console.log(`👀 Watching for changes in: ${folderToWatch}`);
} catch (err) {
  console.error(' Error setting up watcher:', err);
}
