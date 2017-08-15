const {Injectable} = require("../../export-switch");
import {Ng1ShiftTransitions, Ng1ShiftSce} from "../../../../../index";
import {Service5} from "./service5";

@Injectable()
export class Service4 {

    constructor(
        private $transition: Ng1ShiftTransitions,
        private $sce: Ng1ShiftSce,
        private srv5: Service5
    ) {}

    open() {
        console.log("hello from Service4");
        this.srv5.open();

        console.log(this.$transition);
        console.log(this.$sce);
    }
}
