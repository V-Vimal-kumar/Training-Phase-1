const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'folder1');
const targetDir = path.join(__dirname, 'folder2');

function syncDirectories(src, tgt) {
    const actions = {
        copied: [],
        updated: [],
        deleted: [],
    };

    if (!fs.existsSync(tgt)) {
        fs.mkdirSync(tgt, { recursive: true });
    }

    const srcItems = fs.readdirSync(src);
    const tgtItems = fs.existsSync(tgt) ? fs.readdirSync(tgt) : [];

    for (const item of srcItems) {
        const srcPath = path.join(src, item);
        const tgtPath = path.join(tgt, item);

        const srcStat = fs.statSync(srcPath);

        if (srcStat.isDirectory()) {
            syncDirectories(srcPath, tgtPath);
        } else {
            if (!fs.existsSync(tgtPath)) {
                fs.copyFileSync(srcPath, tgtPath);
                actions.copied.push(item);
            } else {
                const tgtStat = fs.statSync(tgtPath);
                if (srcStat.mtimeMs > tgtStat.mtimeMs) {
                    fs.copyFileSync(srcPath, tgtPath);
                    actions.updated.push(item);
                }
            }
        }
    }

    for (const item of tgtItems) {
        const srcPath = path.join(src, item);
        const tgtPath = path.join(tgt, item);

        if (!fs.existsSync(srcPath)) {
            const tgtStat = fs.statSync(tgtPath);
            if (tgtStat.isDirectory()) {
                fs.rmSync(tgtPath, { recursive: true });
            } else {
                fs.unlinkSync(tgtPath);
            }
            actions.deleted.push(item);
        }
    }

    return actions;
}

try {
    const result = syncDirectories(sourceDir, targetDir);

    console.log(`Sync complete.`);
    console.log(`Copied: ${result.copied.join(', ') || 'None'}`);
    console.log(`Updated: ${result.updated.join(', ') || 'None'}`);
    console.log(`Deleted: ${result.deleted.join(', ') || 'None'}`);
} catch (err) {
    console.error('Error during sync:', err.message);
}
