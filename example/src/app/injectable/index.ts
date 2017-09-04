const {NgModule, CommonModule} = require("../export-switch");

import {InjectableComponent} from "./component";
import {Service1} from "./services/service1";
import {Service2} from "./services/service2";
import {Service3} from "./services/service3";
import {Service4} from "./services/service4";
import {Service5} from "./services/service5";

@NgModule({
    imports: [ ...CommonModule ],
    declarations: [ InjectableComponent ],
    providers: [
        Service3,
        Service1,
        Service2,
        Service4,
        Service5
    ],
    exports: [ InjectableComponent ]
})
export class NgShiftInjectableModule {}
