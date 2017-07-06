const {Component} = require("../export-switch");

@Component({
    selector: "ng-shift-module-component",
    template: `
        <h1>Module</h1>
        Parent module component => <child-module-component></child-module-component>
    `
})
export class NgShiftModuleComponent {}
