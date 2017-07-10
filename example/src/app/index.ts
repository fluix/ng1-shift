const {NgModule, BrowserModule, UIRouterModule} = require("./export-switch");

import {AppComponent} from "./component";
import {NgShiftModule} from "./module";
import {NgShiftComponentModule} from "./component/index";
import {NgShiftRouterTestModule} from "./router";

@NgModule({
    imports: [
        ...UIRouterModule,
        ...BrowserModule,

        NgShiftModule,
        NgShiftComponentModule,
        NgShiftRouterTestModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}

if (!process.env.NG2) {
    AppModule.ng1Module.run(() => console.log("hello from run block"));
}
