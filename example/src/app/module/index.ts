import {NgModule} from "../../../../index";
import {NgShiftModuleComponent} from "./component";
import {ChildModule} from "./child-module";

@NgModule({
    id: "ng-shift-module",
    imports: [ ChildModule ],
    declarations: [ NgShiftModuleComponent ]
})
export class NgShiftModule {}
