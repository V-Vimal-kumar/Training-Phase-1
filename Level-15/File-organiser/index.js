const path = require('path');
const { organizeFilesSync } = require('./syncOrganizer');
const { organizeFilesAsync } = require('./asyncOrganizer');
const { watchAndOrganize } = require('./watcher');

const directoryPath = path.resolve(__dirname, 'test-folder'); 

watchAndOrganize(directoryPath);
