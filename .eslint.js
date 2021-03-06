{
    "parser": "babel-eslint",
    "extends": ["eslint:recommended", "prettier"],
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    },
    "env": {
        "browser": true,
        "jest": true,
        "node": true
    }
}