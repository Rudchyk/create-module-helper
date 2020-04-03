module.exports = associations => {
    let args = process.argv.slice(2);
    const maxNumber = 3;
    if(args.length > maxNumber) {
        args = args.slice(0, maxNumber);
    }
    const order = Object.keys(associations);
    const data = {};
    const argsWithKeys = args.filter(item => item.indexOf('=') > -1);
    const argsWithoutKeys = args.filter(item => item.indexOf('=') === -1);
    argsWithKeys.forEach(item => {
        const itemData = item.split('=');
        const key = itemData[0];
        const val = itemData[1];
        for (const association in associations) {
            if (associations.hasOwnProperty(association)) {
                const queryKey = associations[association].find(item => item === key);
                if(queryKey) {
                    data[association] = val;
                }
            }
        }
    });
    argsWithoutKeys.forEach(item => {
        for (let i = 0, iLength = order.length; i < iLength; i++) {
            const element = order[i];
            if(!data[element]) {
                data[element] = item;
                break;
            }
        }
    });
    return data;
};