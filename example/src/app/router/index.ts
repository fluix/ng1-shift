const {NgModule} = require("../export-switch");

import {NgShiftRouterComponent} from "./component";
import {Ng1ShiftRouterModule} from "./router";

const RouterModule: any = process.env.NG2 ? [] : [ Ng1ShiftRouterModule ];

@NgModule({
    imports: [ ...RouterModule ],
    declarations: [ NgShiftRouterComponent ],
    exports: [ NgShiftRouterComponent ]
})
export class NgShiftRouterTestModule {}
