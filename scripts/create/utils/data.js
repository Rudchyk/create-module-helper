const path = require('path');
const packagePath = path.resolve('.', 'package.json');
const packageData = require(packagePath);
const args = process.argv.slice(2);
const order = ['name', 'directory', 'extention'];
const createData = () => {
    const data = {};
    order.forEach(item => {
        data[item] = '';
    });
    return data;
}
const data = createData();
const returnData = data => data[1] || data[0];
args.forEach((item, index) => {
    const itemData = item.split('=');
    let key = itemData[0];
    switch (key) {
        case 'name':
        case 'n':
            data.name = returnData(itemData);
        case 'directory':
        case 'd':
            data.directory = returnData(itemData);
        case 'extention':
        case 'e':
            data.extention = returnData(itemData);
            break;
        default:
            data[order[index]] = key;
            break;
    }
});
const options = packageData.createModule || {};
const associations = options.associations || {};
data.extention = data.extention || (options.default ? options.default.extention : 'vue');
const extentionData = associations[data.extention] || {};
if(extentionData.titleCase) {
    data.name = data.name[0].toUpperCase() + data.name.slice(1);
}
const associationsList = extentionData.folders || [];
let result;
const query = data.directory || (options.default ? options.default.folder : 'components');
console.log('query', query);
if(associationsList.length) {
    console.log('associationsList', associationsList);
    result = associationsList.find(folder => query === folder.slice(0, query.length));
}
data.directory = result || query;
console.log('data', data);
module.exports = data;