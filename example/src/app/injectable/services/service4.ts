const {Injectable} = require("../../export-switch");
import {NgTransitions, NgSce} from "../../../../../index";
import {Service5} from "./service5";

@Injectable()
export class Service4 {

    // NG1 BUILD TEST

    // constructor(
    //     private $transition: NgTransitions,
    //     private $sce: NgSce,
    //     private srv5: Service5
    // ) {}
    //
    // open() {
    //     console.log("hello from Service4");
    //     this.srv5.open();
    //
    //     console.log(this.$transition);
    //     console.log(this.$sce);
    // }


    // NG2 BUILD TEST

    constructor(
        private srv5: Service5
    ) {}

    open() {
        console.log("hello from Service4");
        this.srv5.open();
    }
}
