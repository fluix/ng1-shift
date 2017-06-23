const {NgModule, BrowserModule} = require("./export-switch");

import {NgShiftModule} from "./module";
import {NgShiftComponentModule} from "./component/index";
import {AppComponent} from "./component";

@NgModule({
    imports: [
        BrowserModule,
        NgShiftModule,
        NgShiftComponentModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
