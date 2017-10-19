const {NgModule, CommonModule} = require("../export-switch");

import {NgShiftDirective} from "./directive";
import {NgShiftAttrDirective} from "./attribute/directive";
import {NgShiftElemDirective} from "./element/directive";
import {NgShiftClassDirective} from "./class/directive";

@NgModule({
    imports: [ ...CommonModule ],
    declarations: [
        NgShiftDirective,
        NgShiftAttrDirective,
        NgShiftElemDirective,
        NgShiftClassDirective
    ],
    exports: [ NgShiftDirective ]
})
export class NgShiftDirectiveModule {}
