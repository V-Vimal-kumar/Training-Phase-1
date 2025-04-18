const fs = require('fs');
const path = require('path');
const { getCategory } = require('./utils');

function organizeFilesSync(dirPath) {
  const files = fs.readdirSync(dirPath);
  const report = [];

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.lstatSync(fullPath).isFile()) {
      const ext = path.extname(file);
      const category = getCategory(ext);
      const categoryDir = path.join(dirPath, category);

      if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir);

      const destPath = path.join(categoryDir, file);
      fs.renameSync(fullPath, destPath);

      report.push(`${file} → ${category}/`);
    }
  });

  console.log('\n📄 Sync Report:\n' + report.join('\n'));
}

module.exports = { organizeFilesSync };
