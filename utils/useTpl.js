const fs = require('fs');
const path = require('path');
const { log, logColor, logMsg } = require('./log');



module.exports = data => {
    const {
        tplsFolder,
        tpl,
    } = data;
    const getListOfTheTemplates = (defaultDir = __dirname) => {
        const pathToTplDir = path.resolve(defaultDir, `${defaultDir !== '.' ? '../' : ''}${tplsFolder}`);
        if (!fs.existsSync(pathToTplDir)) {
            return null;
        }
        try {
            const existedTpls = fs.readdirSync(pathToTplDir, 'utf8');
            if(!existedTpls) {
                return null;
            }
            return {
                items: existedTpls,
                path: pathToTplDir
            };
        } catch (error) {
            log(`Unable to scan directory.${logMsg(error)}`);
            return null;
        }
    }
    let customerTpls = getListOfTheTemplates('.');
    let defaultTpls = getListOfTheTemplates();
    if(customerTpls) {
        defaultTpls.items = defaultTpls.items.filter((item, index) => {
            return customerTpls.items.indexOf(item) !== index;
        });
    }
    const createTplsPath = (tpls) => {
        return tpls.items.map(item => path.resolve(tpls.path, item));
    }
    customerTpls = createTplsPath(customerTpls);
    defaultTpls = createTplsPath(defaultTpls);
    const existedTpls = [...customerTpls, ...defaultTpls];
    const getInfoFromPath = (path, query) => {
        const data = path.split('\\');
        const file = data.pop();
        const fileData = file.split('.');
        switch (query) {
            case 'name':
                return fileData.shift();
            case 'ext':
                return fileData.pop();
            default:
                return file;
        }
    }
    const getCorrectTpl = existedTpls.find(file => getInfoFromPath(file, 'name') === tpl);
    if(!getCorrectTpl) {
        const suggestedTpls = existedTpls.reduce((accumulator, file) => {
            return `${accumulator}${accumulator ? '\n' : ''}${getInfoFromPath(file)} (${file})`;
        }, '');
        log(`Template with ${tpl} doesn't exist.${logMsg(`Please use:\n${logColor(suggestedTpls)}`)}\nor create new template: ./tpls/${tpl}.{js|sass|vue}`);
        process.exit();
    }
    return {
        extension: getInfoFromPath(getCorrectTpl, 'ext'),
        tplPath: getCorrectTpl
    };
}