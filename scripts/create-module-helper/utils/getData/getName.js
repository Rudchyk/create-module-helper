module.exports = data => {
    const {
        isTitleCase,
        name,
    } = data;
    if(name && isTitleCase) {
        return name[0].toUpperCase() + name.slice(1);
    }
    return name;
}