import "reflect-metadata";
const {NgModule, BrowserModule, UIRouterModule} = require("./export-switch");

import {AppComponent} from "./component";
import {NgShiftModule} from "./module";
import {NgShiftComponentModule} from "./component/index";
import {NgShiftRouterTestModule} from "./router";
import {NgShiftInjectableModule} from "./injectable";

@NgModule({
    id: "app-module",
    imports: [
        ...UIRouterModule,
        ...BrowserModule,

        NgShiftModule,
        NgShiftComponentModule,
        NgShiftRouterTestModule,
        NgShiftInjectableModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
