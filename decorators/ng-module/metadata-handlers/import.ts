export default function importHandler(ng1Module: any, ng1ModuleIds: any, imports: any) {
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
