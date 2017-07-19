export default function importHandler(imports: any) {
    let ng1ModuleIds: Array<string> = [];

    const modules = imports.filter( ({ $inject }: any) => {
        return !($inject && $inject.find((i: any) => i === "$stateProvider"))
    });

    const ng1RouterConfig = imports.find(({ $inject }: any) => {
        return $inject && $inject.find((i: any) => i === "$stateProvider")
    });

    if (modules.length) {
        ng1ModuleIds = modules.map((mdl: any) => {
            if (mdl.ng1ShiftModuleName) {
                return mdl.ng1ShiftModuleName;
            }

            return mdl;
        });
    }

    return {
        ng1ModuleIds,
        ng1RouterConfig
    }
}
