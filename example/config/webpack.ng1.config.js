const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.base.config");
const polyfills = require("./deps/ng1/polyfills");
const vendor = require("./deps/ng1/vendor");

module.exports = Object.assign({}, baseConfig, {
    entry: {
        polyfills,
        vendor,
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

    devServer: {
        port: 3000
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.ejs",
            inject: false
        })
    ]
});
