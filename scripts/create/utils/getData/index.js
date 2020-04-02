const path = require('path');
const packagePath = path.resolve('.', 'package.json');
const packageData = require(packagePath);
const defaultData = require("../context/default.json");
const deepMerge = require("../deep-merge");
const options = deepMerge(defaultData, packageData.createModule);
const tpls = options.tpls || {};
const data = require("../getArgs")(options.associations);
data.tpl = require("./getTpl")({
    defaultTpl: options.default.tpl,
    tpl: data.tpl
})
const tplData = tpls[data.tpl] || {};
data.name = require("./getName")({
    isTitleCase: tplData.titleCase,
    name: data.name
});
data.dir = require("./getDir")({
    folders: tplData.folders,
    defaultFolder: tplData.default,
    query: data.dir
});
module.exports = {
    data,
    options
};