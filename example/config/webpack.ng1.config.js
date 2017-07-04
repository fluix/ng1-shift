const assign = require("object-assign");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.base.config");

module.exports = assign({}, baseConfig, {
    entry: {
        bundle: "./app"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.ejs",
            inject: "body"
        })
    ]
});
