const {Injectable} = require("../../export-switch");

@Injectable()
export class CoreService {

    open() {
        console.log("hello from CoreService");
    }
}
