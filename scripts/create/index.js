const fs = require('fs');
const path = require('path');
var readlineSync = require('readline-sync');
const { log, logColor, logMsg } = require('./utils/log');
const {
    name,
    directory,
    extention
} = require('./utils/data')
if(!name) {
    return log('Please provide file name!');
}
const pathToTplDir = path.resolve(__dirname, `./tpls`);
const pathToTplFile = path.resolve(pathToTplDir, `tpl.${extention}`);
if(!fs.existsSync(pathToTplFile)) {
    fs.readdir(pathToTplDir, (err, files) => {
        if (err) {
            return log(`Unable to scan directory.${logMsg(err)}`);
        }
        const existedExtentions = files.reduce((accumulator, file) => {
            const fileData = file.split('.');
            const fileName = fileData[0];
            const fileExt = fileData[1];
            return fileName === 'tpl' ? `${accumulator}${accumulator ? ', ' : ''}${fileExt}` : '';
        }, '');
        return log(`Template with ${extention} doesn't exist.${logMsg(`Please use: ${logColor(existedExtentions)}`)} or create new template: tpl.${extention}`);
    });
    return;
}
const tplContent = fs.readFileSync(pathToTplFile, 'utf8');
const newFileDirPath = path.resolve('.', `${directory}`);
if (!fs.existsSync(newFileDirPath)) {
    log(`Directory ${logColor(directory)} doesn't exist`, 'i');
    if (!readlineSync.keyInYNStrict('Do you want to create this directory?')) {
        process.exit();
    }
    fs.mkdirSync(newFileDirPath);
    log(`Directory ${logColor(directory)} (${newFileDirPath}) was successfully created`, 'i');
}
const newFile = path.resolve(newFileDirPath, `${name}.${extention}`);
if (fs.existsSync(newFile)) {
    return log(`File: ${logColor(`${name}.${extention}`)} (${newFile}) already exists! Please provide another name.`);
}
fs.writeFileSync(
    newFile,
    tplContent,
    err => {
        if(err) {
            return log(`File: ${logColor(`${name}.${extention}`)} (${newFile}) wasn't saved.${logMsg(err)}`);
        }
    }
)
log(`File: ${logColor(`${name}.${extention}`)} (${newFile}) was successfully created.`, 's');
switch (extention) {
    default:
        log(`Please use:\n===\nimport ${name} from '~/${directory}/${name}.${extention}\n====`, 'i');
        break;
}