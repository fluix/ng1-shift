import "reflect-metadata";

import importHandler from "./metadata-handlers/import";
import daclarationHandler from "./metadata-handlers/declaration";
import providerHandler from "./metadata-handlers/provider";

export function NgModule({imports, declarations, providers, directRegister}: any) {
    return function (target: any) {
        let ng1ModuleIds: Array<string> = [];
        let ng1Module = angular.module(target.name, ng1ModuleIds);

        if (imports && imports.length) {
            importHandler(ng1Module, ng1ModuleIds, imports);
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
