const assign = require("object-assign");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.base.config");
const vendor = require("./deps/ng1/vendor");

module.exports = assign({}, baseConfig, {
    entry: {
        vendor: vendor,
        bundle: "./app"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.ejs",
            inject: false
        })
    ]
});
