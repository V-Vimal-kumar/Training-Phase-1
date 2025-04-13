const fs = require('fs');
const path = require('path');
const { getCategory } = require('./utils');

async function organizeFilesAsync(dirPath) {
  const report = [];
  try {
    const files = await fs.promises.readdir(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = await fs.promises.lstat(fullPath);

      if (stat.isFile()) {
        const ext = path.extname(file);
        const category = getCategory(ext);
        const categoryDir = path.join(dirPath, category);

        if (!fs.existsSync(categoryDir)) await fs.promises.mkdir(categoryDir);

        const destPath = path.join(categoryDir, file);
        await fs.promises.rename(fullPath, destPath);

        report.push(`${file} → ${category}/`);
      }
    }

    console.log('\n📄 Async Report:\n' + report.join('\n'));
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

module.exports = { organizeFilesAsync };
