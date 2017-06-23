const {NgModule} = require("../../export-switch");

import {ChildComponent} from "./component";

@NgModule({
    declarations: [ ChildComponent ],
    exports: [ ChildComponent ]
})
export class ChildModule {}
