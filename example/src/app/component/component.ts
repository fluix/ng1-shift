const {Component, EventEmitter, Inject, Input, Output} = require("../export-switch");
const template = process.env.NG2 ? require("./template-ng2.html") : require("./template-ng1.html");

import {Service1} from "./services/service1";
import {Service2} from "./services/service2";
import {Service3} from "./services/service3";

@Component({
    selector: "ng-shift-component",
    template
})
export class NgShiftComponent {
    @Input() prop: string;

    list: Array<string> = [];

    constructor(
        private srv2: Service2,
        private srv1: Service1,
        private srv3: Service3
    ) {}

    add(label: string) {
        this.list.push(label);

        this.srv1.open();
        this.srv2.open();
        this.srv3.open();
    }

    remove() {
        this.list.splice(0, 1);
    }
}
