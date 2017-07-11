const {Injectable} = require("../../export-switch");

import {Service2} from "./service2";
import {Service3} from "./service3";

@Injectable()
export class Service1 {
    constructor(
        private srv3: Service3,
        private srv2: Service2
    ) {}

    open() {
        console.log("hello from Service1");
        this.srv2.open();
        this.srv3.open();
    }
}
