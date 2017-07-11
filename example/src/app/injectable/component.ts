const {Component, EventEmitter, Inject, Input, Output} = require("../export-switch");
const template = process.env.NG2 ? require("./templates/ng2.html") : require("./templates/ng1.html");

import {Service1} from "./services/service1";

@Component({
    selector: "ng-shift-injectable",
    template
})
export class InjectableComponent {
    static $inject = [
        "srv1"
    ]

    constructor(private srv1: Service1) {}

    testNestedDI() {
        this.srv1.open();
    }
}
