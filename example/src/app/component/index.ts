const {NgModule, CommonModule} = require("../export-switch");

import {NgShiftComponent} from "./component";
import {ChildAppComponent} from "./child/component";

class Service1 {
    open1() {}
}
class Service2 {
    open2() {}
}
class Service3 {
    open3() {}
}
class Service4 {
    open4() {}
}

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
    exports: [ NgShiftComponent ]
})
export class NgShiftComponentModule {}
