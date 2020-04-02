const fs = require('fs');
const path = require('path');
const { log, logColor, logMsg } = require('./log');

module.exports = data => {
    const {
        tplsFolder,
        tpl,
    } = data;
    const pathToTplDir = path.resolve(__dirname, `../${tplsFolder}`);
    let existedTpls;
    try {
        existedTpls = fs.readdirSync(pathToTplDir, 'utf8');
    } catch (error) {
        log(`Unable to scan directory.${logMsg(error)}`);
    }
    const getCorrectTpl = existedTpls.find(file => file.split('.')[0] === tpl);
    if(!getCorrectTpl) {
        const suggestedTpls = existedTpls.reduce((accumulator, file) => {
            const fileName = file.split('.').shift();
            return `${accumulator}${accumulator ? ', ' : ''}${fileName}`;
        }, '');
        return log(`Template with ${tpl} doesn't exist.${logMsg(`Please use: ${logColor(suggestedTpls)}`)} or create new template: ${tpl}.{js|sass|vue}`);
    }
    return {
        extention: getCorrectTpl.split('.').pop(),
        tplPath: path.resolve(pathToTplDir, getCorrectTpl)
    };
}