import "reflect-metadata";
const {NgModule, BrowserModule, UIRouterModule} = require("./export-switch");

import "reflect-metadata";

import {AppComponent} from "./component";
import {NgShiftModule} from "./module";
import {NgShiftComponentModule} from "./component/index";
import {NgShiftRouterTestModule} from "./router";
import {NgShiftInjectableModule} from "./injectable";
import {CoreModule} from "./core/index";

@NgModule({
    id: "app-module",
    imports: [
        ...UIRouterModule,
        ...BrowserModule,

        CoreModule,
        NgShiftModule,
        NgShiftComponentModule,
        NgShiftRouterTestModule,
        NgShiftInjectableModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
