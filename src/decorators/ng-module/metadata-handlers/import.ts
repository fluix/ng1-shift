import {findFirst} from "../../../helpers/array";

type ng1Module = { $inject?: Array<string> } | any;

export default function importHandler(imports: Array<ng1Module>) {
    let ng1ModuleIds: Array<string> = [];

    const modules = imports.filter((mdl: ng1Module) => {
        return !(
            mdl.$inject
            && findFirst(mdl.$inject, (i: any) => i === "$stateProvider")
        );
    });

    const ng1RouterConfig = findFirst(imports, (mdl: ng1Module) => {
        return mdl.$inject
            && findFirst(mdl.$inject, (i: any) => i === "$stateProvider");
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
    };
}
