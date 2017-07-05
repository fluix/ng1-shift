const {Component, EventEmitter, Inject, Input, Output} = require("../export-switch");
const template = process.env.NG2 ? require("./template-ng2.html") : require("./template-ng1.html");

import {Service1} from "./services/service1";

@Component({
    selector: "ng-shift-component",
    template
})
export class NgShiftComponent {
    @Input() prop: string;

    list: Array<string> = [];

    static $inject = [
        "service1"
    ];

    constructor(
        private srv1: any
        // private srv1: Service1
    ) {}

    add(label: string) {
        this.list.push(label);
    }

    remove() {
        this.list.splice(0, 1);
    }
}
