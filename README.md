# create-module-helper

Module to automaticaly create components for your project

## Settings:
* Open package.json
* add in the root:
    ```json
    "createModule": {
        "default": {
            "tpl": "vue" //your default template
        },
        // templates which you want to use in your project
        "tpls": {
            "vue": { // name of the template
                "titleCase": true, // do we need to have the name of the files in the titleCase mode
                "default": "components", // default folder
                // list of folders which can be used for this template
                "folders": [
                    "layouts",
                    "pages"
                ]
            }
        }
    }
    ```
    Values by default you can find in `./scripts/create-module-helper/utils/context/default.json`
* add to the `scripts`: `"create": "node ./scripts/create-module-helper",`

### if you want to create different scripts with values by default, please use:
* `"create": "node ./scripts/create-module-helper tpl=sass",` - fo use sass tpl by default
* `"create": "node ./scripts/create-module-helper dir=pages",` - fo use pages folder by default for default template




