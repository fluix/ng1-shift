const {NgModule, Componet} = require("../export-switch");
import {NgShiftDirectiveComponent} from "./component";
import {NgShiftDirective} from "./directive";

@NgModule({
    declarations: [
        NgShiftDirectiveComponent,
        NgShiftDirective
    ]
})
export class NgShiftDirectiveModule {}
