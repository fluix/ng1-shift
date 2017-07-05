const assign = require("object-assign");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.base.config");
const vendor = require("./deps/ng1/vendor");

module.exports = assign({}, baseConfig, {
    entry: {
        vendor: vendor,
        bundle: "./app"
    },

    module: {
        rules: [
            {test: /\.ts$/, use: "ts"},
            {test: /\.html$/, use: "raw"}
        ],

        // WARNING in ./~/@angular/core/@angular/core.es5.js
        // 5870:15-36 Critical dependency: the request of a dependency is an expression
        exprContextCritical: false
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.ejs",
            inject: false
        })
    ]
});
