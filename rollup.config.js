import * as path from "path";
import ts from "typescript";
import rollupAlias from "rollup-plugin-alias";
import typescript from "rollup-plugin-typescript";

export default {
	entry: "example/src/app.ts",
	format: "iife",
	dest: "example/bundle.js",
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
