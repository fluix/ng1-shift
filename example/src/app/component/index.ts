const {NgModule, CommonModule} = require("../export-switch");

import {NgShiftComponent} from "./component";
import {ChildAppComponent} from "./child/component";
import {Service1} from "./services/service1";

// angular.module("ng-shift-component", [])
//     .service("service1", Service1)
//     .service("service2", Service2)
//     .service("service3", Service3)
//     .service("service4", Service4)

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        NgShiftComponent,
        ChildAppComponent
    ],
    providers: [ Service1 ],
    exports: [ NgShiftComponent ]
})
export class NgShiftComponentModule {}
