import "reflect-metadata";
import * as angular from "angular";

import importHandler from "./metadata-handlers/import";
import daclarationHandler from "./metadata-handlers/declaration";
import providerHandler from "./metadata-handlers/provider";
import counter from "../../helpers/counter";

export function NgModule({imports, declarations, providers, directRegister}: any) {
    return function (target: any) {
        var ng1ModuleIds: Array<string> = [];
        var ng1RouterConfig;

        target.ngShiftModuleName = `${target.name}-${counter}`;

        if (target.name === "AppModule") {
            target.ngShiftModuleName = target.name;
        }

        if (imports && imports.length) {
            var {ng1ModuleIds, ng1RouterConfig} = importHandler(imports);
        }

        const ng1Module = angular.module(target.ngShiftModuleName, ng1ModuleIds);

        if (ng1RouterConfig) {
            ng1Module.config(ng1RouterConfig);
        }

        if (declarations && declarations.length) {
            daclarationHandler(ng1Module, declarations);
        }

        if (providers && providers.length) {
            providerHandler(ng1Module, providers, declarations);
        }

        if (directRegister) {
            directRegister(ng1Module);
        }
    }
}
