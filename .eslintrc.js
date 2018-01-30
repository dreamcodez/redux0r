module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:flowtype/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "flowtype",
    ],
    "globals": {
        "describe": true,
        "beforeEach": true,
        "afterEach": true,
        "it": true,
        "xit": true,
        "fit": true,
        "window": true,
        "document": true,
        "before": true,
        "after": true,
        "fail": true
    },
    "rules": {
        "array-bracket-spacing": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "comma-dangle": [ "error", "always-multiline" ],
        "comma-spacing": [
            "error",
            { "before": false, "after": true }
        ],
        "curly": [
            "error",
            "all",
        ],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-case-declarations": "off",
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "space-before-blocks": [
            "error",
            "always"
        ],
        "strict": 0,
        "flowtype/no-types-missing-file-annotation": 0
    }
};
