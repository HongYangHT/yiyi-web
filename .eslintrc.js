/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2019-12-30 11:48:00
 * @LastEditTime: 2020-04-09 23:19:34
 */
module.exports = {
  root: true,
  extends: [
    // "plugin:vue/strongly-recommended",
    // "plugin:prettier/recommended"
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    //强制使用单引号
    "quotes": ["error", "single"],
    //强制不使用分号结尾
    "semi": ["error", "never"],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 180, //一行的字符数，如果超过会进行换行，默认为80
        "tabWidth": 2, //一个tab代表几个空格数，默认为80
        "useTabs": false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
        "singleQuote": true, //字符串是否使用单引号，默认为false，使用双引号
        "semi": false, //行位是否使用分号，默认为true
        "trailingComma": "es5", //是否使用尾逗号，有三个可选值"<none|es5|all>"
        "bracketSpacing": true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
        "jsxBracketSameLine": true,
        "alwaysParens": "avoid",
        "htmlWhitespaceSensitivity": "ignore"
      }
    ],
    // indent: ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    "no-undef": 0,
    "no-restricted-globals": 0,
    "no-unused-vars": 0,
    "comma-dangle": 0,
    "object-curly-newline": 0,
    "vue/no-parsing-error": [2, {
      "x-invalid-end-tag": false
    }],
    "vue/no-unused-components": 0
  },
  plugins: [
    'babel',
    'prettier',
    'vue'
  ]
};
