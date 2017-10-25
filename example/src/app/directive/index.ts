const {NgModule, CommonModule} = require("../export-switch");

import {NgShiftDirectiveComponent} from "./component";
import {NgShiftAttrDirective} from "./attribute/directive";
import {NgShiftElemDirective} from "./element/directive";
import {NgShiftClassDirective} from "./class/directive";

@NgModule({
    declarations: [
        NgShiftDirectiveComponent,
        NgShiftAttrDirective,
        NgShiftElemDirective,
        NgShiftClassDirective
    ],
    exports: [ NgShiftDirectiveComponent ]
})
export class NgShiftDirectiveModule {}
