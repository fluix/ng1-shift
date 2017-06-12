import {AppComponent} from "./component";
import {NgShiftModule} from "./module";
import {NgShiftComponentModule} from "./component/index";

angular.module("ng1-shift", [
    NgShiftModule.id,
    NgShiftComponentModule.id
])
.component("appComponent", AppComponent);
