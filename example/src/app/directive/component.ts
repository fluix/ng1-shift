const {Component} = require("../export-switch");

@Component({
    selector: "ng-shift-directive-component",
    template: `
        <h1>Directive</h1>
        <p ng-shift-directive>text</p>
    `
})
export class NgShiftDirectiveComponent {}
