const root = require("./helpers/root");

module.exports = {
    context: root("src"),

    output: {
        path: "/",
        filename: "build/[name].js"
    },

    resolve: {
        modules: ["node_modules"],
        extensions: [".ts", ".js"]
    },

    resolveLoader: {
        modules: ["node_modules"],
        extensions: ["*", ".js"],
        moduleExtensions: ["-loader"]
    },

    module: {
        rules: [
            {test: /\.ts$/, use: "ts"},
            {test: /\.html$/, loader: "raw"}
        ],

        exprContextCritical: false
    },

    devServer: {
        port: "3000",
        inline: true,
        contentBase: root("/"),
        historyApiFallback: true,
        stats: "minimal"
    }
};