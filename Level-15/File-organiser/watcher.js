// watcher.js
const fs = require('fs');
const path = require('path');
const { getCategory } = require('./utils');

function watchAndOrganize(dirPath) {
  console.log(`\n👀 Watching for changes in ${dirPath}...\n`);

  fs.watch(dirPath, (eventType, filename) => {
    if (filename && eventType === 'rename') {
      const filePath = path.join(dirPath, filename);

      setTimeout(() => {
        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
          const ext = path.extname(filename);
          const category = getCategory(ext);
          const categoryDir = path.join(dirPath, category);

          if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir);

          const destPath = path.join(categoryDir, filename);
          fs.rename(filePath, destPath, (err) => {
            if (err) console.error('❌ Move error:', err);
            else console.log(`✅ Moved: ${filename} → ${category}/`);
          });
        }
      }, 500);
    }
  });
}

module.exports = { watchAndOrganize };
