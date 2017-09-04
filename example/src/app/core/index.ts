const {NgModule} = require("../export-switch");
import {CoreService} from "./services/core-service";

@NgModule({
    providers: [CoreService]
})
export class CoreModule {}
