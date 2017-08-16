const {Component} = require("../export-switch");
const template = process.env.NG2 ? require("./templates/ng2.html") : require("./templates/ng1.html");

import {NgQ, NgTimeout} from "../../../../index";
import {Service1} from "./services/service1";

@Component({
    selector: "ng-shift-injectable",
    template
})
export class InjectableComponent {

    // NG1 BUILD TEST

    // constructor(
    //     private srv1: Service1,
    //     private $q: NgQ,
    //     private $timeout: NgTimeout
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
