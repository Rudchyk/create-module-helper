const fs = require('fs');
const path = require('path');
const { log, logColor, logMsg } = require('./utils/log');
const useContent = require('./utils/useContent');
const {
    data,
    options
} = require('./utils/getData');
const {
    name,
    dir,
    tpl
} = data;
if(!name) {
    return log(`Please provide file name!${logMsg(`Please use: ${logColor('npm run create {name}')} or read README.md`)}`);
}
const { extention, tplPath } = require('./utils/useTpl')({
    tplsFolder: options.tplsFolder,
    tpl
});
const { fileDirPath } = require('./utils/useDir')({
    dir
});
const newFileName = `${name}.${extention}`;
const newFile = path.resolve(fileDirPath, newFileName);
if (fs.existsSync(newFile)) {
    return log(`File: ${logColor(newFileName)} (${newFile}) already exists! Please provide another name.`);
}
const newFileContent = useContent(fs.readFileSync(tplPath, 'utf8'));
fs.writeFileSync(
    newFile,
    newFileContent,
    err => {
        if(err) {
            return log(`File: ${logColor(newFileName)} (${newFile}) wasn't saved.${logMsg(err)}`);
        }
    }
);
const tplMsg = options.tpls[tpl].msg || '';
log(`File: ${logColor(newFileName)} (${newFile}) was successfully created.`, 's');
log(`Please use:\n===\n${useContent(tplMsg)}\n====`, 'i');









