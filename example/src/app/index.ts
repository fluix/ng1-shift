const {NgModule, BrowserModule} = require("./export-switch");

import {AppComponent} from "./component";
import {NgShiftModule} from "./module";
import {NgShiftComponentModule} from "./component/index";
import {NgShiftRouterTestModule} from "./router";

@NgModule({
    imports: [
        "ui.router",
        BrowserModule,
        NgShiftModule,
        NgShiftComponentModule,
        NgShiftRouterTestModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
