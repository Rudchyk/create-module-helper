const readlineSync = require('readline-sync');
const fs = require('fs');
const path = require('path');
const { log, logColor, logMsg } = require('./log');

module.exports = data => {
    const {
        dir,
    } = data;
    const fileDirPath = path.resolve('.', `${dir}`);
    if (!fs.existsSync(fileDirPath)) {
        log(`Directory ${logColor(dir)} doesn't exist`, 'i');
        if (!readlineSync.keyInYNStrict('Do you want to create this directory?')) {
            process.exit();
        }
        fs.mkdirSync(fileDirPath);
        log(`Directory ${logColor(dir)} (${fileDirPath}) was successfully created`, 'i');
    }
    return {
        fileDirPath
    };
}