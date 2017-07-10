import toCamelCase from "../../helpers/to-camel-case";

export function NgModule({imports, declarations, providers}: any) {
    return function (target: any) {
        let ng1ModuleIds: Array<string> = [];
        let ng1Module = angular.module(target.name, ng1ModuleIds);

        if (imports) {
            const modules = imports.filter(({ $inject }: any) =>
                !($inject && $inject.find((i: any) => i === "$stateProvider")));

            const ng1RouterConfig = imports.find(({ $inject }: any) =>
                $inject && $inject.find((i: any) => i === "$stateProvider"));

            if (modules.length) {
                const preparedIds = modules.map((mdl: any) => {
                    if (mdl.name) {
                        return mdl.name;
                    }

                    return mdl;
                });
                ng1ModuleIds.push(...preparedIds);
            }

            if (ng1RouterConfig) {
                ng1Module.config(ng1RouterConfig);
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
                    const injectedServices = injections.map(({ name }: any) => name);

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
