const { data } = require('./getData');

module.exports = tpl => {
    const { name, dir, extention } = data;
    return tpl
        .replace(/{name}/g, name)
        .replace(/{dir}/g, dir)
        .replace(/{ext}/g, extention);
}