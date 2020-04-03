module.exports = data => {
    const { name, dir, extention } = data;
    const prepareContent = tpl => {
        return tpl
            .replace(/{name}/g, name)
            .replace(/{dir}/g, dir)
            .replace(/{ext}/g, extention);
    }
    return {
        prepareContent
    };
}