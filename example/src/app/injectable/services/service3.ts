const {Injectable} = require("../../export-switch");

import {Service4} from "./service4";

@Injectable()
export class Service3 {
    constructor(private srv4: Service4) {}

    open() {
        console.log("hello from Service3");
        this.srv4.open();
    }
}
