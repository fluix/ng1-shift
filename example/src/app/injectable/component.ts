const {Component} = require("../export-switch");
const template = process.env.NG2 ? require("./templates/ng2.html") : require("./templates/ng1.html");

import {Ng1ShiftQ, Ng1ShiftTimeout} from "../../../../index";
import {Service1} from "./services/service1";

@Component({
    selector: "ng-shift-injectable",
    template
})
export class InjectableComponent {

    // NG1 BUILD TEST

    // constructor(
    //     private srv1: Service1,
    //     private $q: Ng1ShiftQ,
    //     private $timeout: Ng1ShiftTimeout
    // ) {}
    //
    // testNestedDI() {
    //     console.log(this.$q);
    //     console.log(this.$timeout);
    //     this.srv1.open();
    // }


    // NG2 BUILD TEST

    constructor(
        private srv1: Service1
    ) {}

    testNestedDI() {
        this.srv1.open();
    }
}
