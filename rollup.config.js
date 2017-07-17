import * as path from "path";
import ts from "typescript";
import typescript from "rollup-plugin-typescript";

export default {
    entry: "./index.ts",
    dest: "./dist/index.js",
    format: "umd",
    moduleName: "ng1-shift",
    plugins: [
        typescript({
            typescript: ts
        })
    ],
    external: ["reflect-metadata"]
}
