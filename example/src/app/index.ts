const {NgModule, BrowserModule, UIRouterModule} = require("./export-switch");

import "reflect-metadata";

import {AppComponent} from "./component";
import {NgShiftModule} from "./module";
import {NgShiftComponentModule} from "./component/index";
import {NgShiftDirectiveModule} from "./directive/index";
import {NgShiftRouterTestModule} from "./router";

@NgModule({
    id: "app-module",
    imports: [
        ...UIRouterModule,
        ...BrowserModule,

        NgShiftModule,
        NgShiftComponentModule,
        NgShiftDirectiveModule,
        NgShiftRouterTestModule
    ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
