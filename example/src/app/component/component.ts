const {Component, EventEmitter, Inject, Input, Output} = require("../export-switch");
const template = process.env.NG2 ? require("./templates/ng2.html") : require("./templates/ng1.html");

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
    ngAfterInitFired = false;

    constructor(
        private srv2: Service2,
        private srv1: Service1,
        private srv3: Service3
    ) {}

    ngAfterViewInit() {
        const afterViewInitSpan = document.createElement("span");
        const componentHeader = document.querySelector("ng-shift-component h1");

        if (componentHeader) {
            afterViewInitSpan.textContent = "ngAfterViewInit called: true";
            componentHeader.parentElement.insertBefore(afterViewInitSpan, componentHeader.nextSibling);
        }
    }

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
