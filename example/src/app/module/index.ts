const {NgModule} = require("../export-switch");

import {ChildModule} from "./child";
import {NgShiftModuleComponent} from "./component";

@NgModule({
    imports: [ ChildModule ],
    declarations: [ NgShiftModuleComponent ],
    exports: [ NgShiftModuleComponent ]
})
export class NgShiftModule {}
