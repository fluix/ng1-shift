const assign = require("object-assign");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.base.config");
const polyfills = require("./deps/ng2/polyfills");
const vendor = require("./deps/ng2/vendor");

const plugins = [
    // Provides context to Angular"s use of System.import
    new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)@angular/, "./src"
    ),
    new HtmlWebpackPlugin({
        template: "./index.ejs",
        inject: false,
        NG2: true
    }),
    new DefinePlugin({
        process: {
            env: { NG2: true }
        }
    })
];

module.exports = assign({}, baseConfig, {
    entry: {
        polyfills,
        vendor,
        bundle: "./main"
    },

    module: {
        rules: [
            {test: /\.ts$/, use: "ts"},
            {test: /\.html$/, use: "raw"}
        ]
    },

    plugins
});
