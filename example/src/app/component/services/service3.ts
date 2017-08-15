const {Injectable} = require("../../export-switch");

@Injectable()
export class Service3 {
    open() {
        console.log("hello from Service3");
    }
}
