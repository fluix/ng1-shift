const {Injectable} = require("../../export-switch");

@Injectable()
export class Service1 {
    open() {
        console.log("hello from Service1");
    }
}
