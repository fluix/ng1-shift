export default function importHandler(imports: any) {
    let ng1ModuleIds: Array<string> = [];

    const modules = imports.filter(({ $inject }: any) =>
        !($inject && $inject.find((i: any) => i === "$stateProvider")));

    const ng1RouterConfig = imports.find(({ $inject }: any) =>
        $inject && $inject.find((i: any) => i === "$stateProvider"));

    if (modules.length) {
        ng1ModuleIds = modules.map((mdl: any) => {
            if (mdl.ngShiftModuleName) {
                return mdl.ngShiftModuleName;
            }

            return mdl;
        });
    }

    return {
        ng1ModuleIds,
        ng1RouterConfig
    }
}
