import importHandler from "./metadata-handlers/import";
import daclarationHandler from "./metadata-handlers/declaration";
import providerHandler from "./metadata-handlers/provider";
import counter from "../../helpers/counter";

export function NgModule({id, imports, declarations, providers, directRegister}: any) {
    return function (target: any) {
        let ng1ModuleIds: Array<string> = [];
        let ng1RouterConfig;

        const hasImports = imports && imports.length;

        if (hasImports) {
            const handledImports = importHandler(imports);
            ng1ModuleIds = handledImports.ng1ModuleIds;
            ng1RouterConfig = handledImports.ng1RouterConfig;
        }

        target.ng1ShiftModuleName = `${target.name}-${counter("moduleName")}`;

        if (id === "app-module") {
            target.ng1ShiftModuleName = id;
        }

        // @ts-ignore
        const ng1Module = angular.module(target.ng1ShiftModuleName, ng1ModuleIds);

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
    };
}
