const {Injectable} = require("../../export-switch");

@Injectable()
export class Service2 {
    open() {
        console.log("hello from Service2");
    }
}
