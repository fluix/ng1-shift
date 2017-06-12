import ts from "typescript";
import typescript from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    entry: "example/src/app/vendor.ts",
    dest: "example/vendor.js",
    format: "iife",
    plugins: [
        typescript({
            typescript: ts
        }),

        // reflect-metadata requirements
        resolve({
            jsnext: true,
            module: true,
            main: true,
            browser: true
        }),
        commonjs({
            include: 'node_modules/**'
        })
    ]
}
