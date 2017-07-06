const {NgModule} = require("../export-switch");

import {NgShiftRouterComponent} from "./component";
import {Ng1ShiftRouterModule} from "./router";

@NgModule({
    imports: [ Ng1ShiftRouterModule ],
    declarations: [ NgShiftRouterComponent ],
    exports: [ NgShiftRouterComponent ]
})
export class NgShiftRouterTestModule {}
