import * as path from "path";
import ts from "typescript";
import rollupAlias from "rollup-plugin-alias";
import typescript from "rollup-plugin-typescript";

export default {
    entry: "example/src/app.ts",
    dest: "example/bundle.js",
    format: "iife",
    plugins: [
        rollupAlias({
            tslib: "node_modules/tslib/tslib.es6.js",
            // angular: "node_modules/angular/angular.js"
        }),
        typescript({
            typescript: ts
        })
    ]
}
