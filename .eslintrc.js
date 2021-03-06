module.exports = {
    env : {
        browser : true,
        es2021 : true,
        node : true,
    },
    extends : [ "plugin:react/recommended" ],
    parserOptions : {
        ecmaFeatures : {
            jsx : true,
        },
        ecmaVersion : "latest",
        sourceType : "module",
    },
    plugins : [ "react" ],
    rules : {
        indent : [ "warn", 4 ],
        "no-console" : 0,
        semi : [ "warn", "always" ],
        quotes : [ "warn", "double" ],
        "no-cond-assign" : [ "warn", "always" ],
        curly : [ "warn", "all" ],
        eqeqeq : [ "warn", "always" ],
        "no-multi-spaces" : "error",
        "no-unused-vars" : "warn",
        "no-use-before-define" : "warn",
        "array-bracket-spacing" : [ "error", "always" ],
        "no-var" : "error",
        "block-spacing" : "error",
        "space-in-parens" : [ "error", "always" ],
        "space-before-blocks" : "error",
        "arrow-spacing" : "error",
        "semi-spacing" : "error",
        "object-curly-spacing" : [ "error", "always" ],
        "key-spacing" : [ "error", { beforeColon : true, afterColon : true } ],
        "react/prop-types" : "off"
    },
};
