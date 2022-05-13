module.exports = {

  "root": true,
  "env": {
    browser: true,
    es6: true,
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    quotes: ["error", "double"],
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8,
    "allowImportExportEverywhere": true,

  },
};
