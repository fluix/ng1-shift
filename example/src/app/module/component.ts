const {Component} = require("../export-switch");

@Component({
    selector: "ng-shift-module-component",
    template: `
        Parent module component => <child-module-component></child-module-component>
    `
})
export class NgShiftModuleComponent {}
