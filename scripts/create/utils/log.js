/*
    @https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-
    Reset = "\x1b[0m"
    Bright = "\x1b[1m"
    Dim = "\x1b[2m"
    Underscore = "\x1b[4m"
    Blink = "\x1b[5m"
    Reverse = "\x1b[7m"
    Hidden = "\x1b[8m"

    FgBlack = "\x1b[30m"
    FgRed = "\x1b[31m"
    FgGreen = "\x1b[32m"
    FgYellow = "\x1b[33m"
    FgBlue = "\x1b[34m"
    FgMagenta = "\x1b[35m"
    FgCyan = "\x1b[36m"
    FgWhite = "\x1b[37m"

    BgBlack = "\x1b[40m"
    BgRed = "\x1b[41m"
    BgGreen = "\x1b[42m"
    BgYellow = "\x1b[43m"
    BgBlue = "\x1b[44m"
    BgMagenta = "\x1b[45m"
    BgCyan = "\x1b[46m"
    BgWhite = "\x1b[47m"
*/
const logColor = (str, color = '31') => {
    return `\x1b[${color}m${str}\x1b[0m`;
};
const logMsg = msg => {
    return `${logColor('\nLOG:', '33')} ${msg}`;
};
const log = (msg, state) => {
    let color, title, type;
    switch (state) {
        case 's':
            type = 'log'
            color = '\x1b[34m';
            title = 'SUCCESS';
            break;
        case 'i':
            type = 'info'
            color = '\x1b[32m';
            title = 'INFO';
            break;
        default:
            type = 'error';
            color = '\x1b[31m';
            title = 'ERROR';
            break;
    }
    return console[type](`${color}%s\x1b[0m`, title, msg);
};
module.exports = {
    log,
    logColor,
    logMsg
}