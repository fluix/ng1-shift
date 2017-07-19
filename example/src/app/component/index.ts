const {NgModule, CommonModule} = require("../export-switch");

import {NgShiftComponent} from "./component";
import {ChildAppComponent} from "./child/component";
import {Service1} from "./services/service1";
import {Service2} from "./services/service2";
import {Service3} from "./services/service3";

@NgModule({
    imports: [ ...CommonModule ],
    declarations: [
        NgShiftComponent,
        ChildAppComponent
    ],
    providers: [
        Service3,
        Service1,
        Service2,
    ],
    exports: [ NgShiftComponent ]
})
export class NgShiftComponentModule {}
