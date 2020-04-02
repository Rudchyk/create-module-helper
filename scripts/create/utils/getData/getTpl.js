module.exports = data => {
    const {
        defaultTpl,
        tpl,
    } = data;
    return tpl || defaultTpl;
}