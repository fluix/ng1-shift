const {Component} = require("./export-switch");

@Component({
    selector: "app-component",
    template: `
        <ng-shift-module-component></ng-shift-module-component>
        <ng-shift-component></ng-shift-component>
        <ng-shift-router></ng-shift-router>
        <ng-shift-directive-component></ng-shift-directive-component>
        <ng-shift-injectable></ng-shift-injectable>
    `
})
export class AppComponent {}
