import * as path from "path";
import ts from "typescript";
import rollupAlias from "rollup-plugin-alias";
import typescript from "rollup-plugin-typescript";

export default {
    entry: "./index.ts",
    dest: "./dist/index.js",
    format: "iife",
    moduleName: "ng1shift",
    plugins: [
        rollupAlias({
            tslib: "node_modules/tslib/tslib.es6.js",
        }),
        typescript({
            typescript: ts
        })
    ]
}
