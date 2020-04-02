module.exports = data => {
    const {
        defaultFolder,
        folders = [],
        query
    } = data;
    let queryFolder = query || defaultFolder;
    if(folders.length) {
        folders.push(defaultFolder);
        queryFolder = folders.find(folder => queryFolder === folder.slice(0, queryFolder.length));
    }
    return queryFolder;
}