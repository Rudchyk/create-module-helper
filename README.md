# create-module-helper

The module to automatically create components for your project

## Usage:
* Open `package.json`
* add "createModule" prop in the root of the obj
* add the default template (`vue` as an example) to the `createModule`:
    ```json
    "default": {
        "tpl": "vue"
    }
    ```
* add templates options which you want to use in your project
    ```json
    "tpls": {
        "vue": {
            "titleCase": true,
            "default": "components",
            "folders": [
                "layouts",
                "pages"
            ],
            "msg": "import {name} from '~/{dir}/{name}.vue"
        }
    }
    ```
    * `createModule.tpls[{tpl}]` - name of the template;
    * `createModule.tpls[{tpl}].titleCase` - do we need to have the name of the files in the titleCase mode;
    * `createModule.tpls[{tpl}].default` - default folder where the new file from the template will be created (when you call without "dir|d" parameter);
    * `createModule.tpls[{tpl}].folders` - the list of folders which can be used for this template (when you call "dir=pages" or "d=pages"). All list of associations you can find in `default.json`. You can extend them or add new.
    * `createModule.tpls[{tpl}].msg` - the message to simplify using of the file
* add to the `scripts`: `"create": "node ./node_modules/create-module-helper"`
* call:
    * `npm run create boo` - to create a file with the name:`boo` from the template:`createModule.default.tpl` in the directory:`createModule.tpls[{tpl}].default`;
    * `npm run create boo {d|dir}=pages` - to create a file with the name:`boo` from the template:`createModule.default.tpl` in the directory:`./pages`;
    * `npm run create boo {d|dir}=p` - to create a file with the name:`boo` from the template:`createModule.default.tpl` in the directory:`createModule.tpls[{createModule.default.tpl}].folders["pages"]`. "pages" will be the first element associated with letter "p";
    * `npm run create boo {tpl|t}=js` - to create a file with the name:`boo` from the template:`js` in the directory:`createModule.tpls[js].default`;
    * `npm run create boo {d|dir}=pages {tpl|t}=js` - to create a file with the name:`boo` from the template:`js` in the directory:`createModule.tpls[js].folders["pages"]`;

All default values you can find in `default.json` (`./context/default.json`).

### if you want to create different scripts with values by default, please use:
* `"create": "node ./node_modules/create-module-helper tpl=sass",` - fo use sass tpl by default
* `"create": "node ./node_modules/create-module-helper dir=pages",` - fo use pages folder by default for default template




