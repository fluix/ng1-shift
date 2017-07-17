import "reflect-metadata";

import importHandler from "./metadata-handlers/import";
import daclarationHandler from "./metadata-handlers/declaration";
import providerHandler from "./metadata-handlers/provider";

let ng1ModuleNameStore = [] as any;

export function NgModule({imports, declarations, providers, directRegister}: any) {
    return function (target: any) {
        var ng1ModuleIds: Array<string> = [];
        var ng1RouterConfig;

        if (imports && imports.length) {
            var {ng1ModuleIds, ng1RouterConfig} = importHandler(imports);
        }

        if (ng1ModuleNameStore.indexOf(target.name)) {
            ng1ModuleNameStore.push(target.name)
        } else {
            throw `🚔 NG1SHIFT: Module name ${target.name} already exists`;
        }

        const ng1Module = angular.module(target.name, ng1ModuleIds);

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
