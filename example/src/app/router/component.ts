const {Component} = require("../export-switch");
const template = process.env.NG2 ? require("./templates/ng2.html") : require("./templates/ng1.html");

@Component({
    selector: "ng-shift-router",
    template
})
export class NgShiftRouterComponent {}
