const { src, dest, watch } = require('gulp');
const notify = require("gulp-notify");

const files = [
  './tpls/**/*',
  './utils/**/*',
  './context/**/*',
  './index.js'
];

function js(path) {
  return src(path)
    .pipe(dest(`./test/node_modules/create-module-helper/`))
    .pipe(notify(`File <%= file.relative %> was changed and moved to test`));
}

exports.default = () => {
  watch(files).on('change', js);
};
