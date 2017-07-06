import toCamelCase from "../../helpers/to-camel-case";

export function NgModule({imports, declarations, providers}: any) {
    return function (target: any) {
        let ng1ModuleIds: Array<string> = [];
        let ng1Module = angular.module(target.name, ng1ModuleIds);

        if (imports) {
            let preparedIds = imports
                .filter((mdl: any) => {
                    return mdl !== void 0 && (mdl.name && mdl.name.indexOf("RouterModule") === -1 || mdl === "ui.router")
                })
                .map((mdl: any) => {
                    if (mdl.name) {
                        return mdl.name;
                    }

                    return mdl;
                });
            ng1ModuleIds.push(...preparedIds);

            const router = imports
                .find((mdl: any) => mdl !== void 0 && mdl.name && mdl.name.indexOf("RouterModule") !== -1);

            if (router) {
                ng1Module.config(router);
            }
        }

        if (declarations) {
            declarations.forEach((declaration: any) => {
                const selectorNg2 = declaration.selector;
                const selectorNg1 = toCamelCase(selectorNg2);

                ng1Module.component(selectorNg1, declaration);
            });
        }

        if (providers) {
            declarations.forEach((declaration: any) => {
                const injections = Reflect.getMetadata("design:paramtypes", declaration);

                if (injections) {
                    const injectedServices = injections.map((a: any) => a.name);

                    if (!declaration.$inject) {
                        declaration.$inject = [];
                    }

                    providers.forEach((provider: any) => {
                        const serviceToken = provider.name;
                        const injectIndex = injectedServices.indexOf(serviceToken);

                        declaration.$inject[injectIndex] = serviceToken;
                        ng1Module.service(serviceToken, provider);
                    });
                }
            });
        }
    }
}
