const {Directive, EventEmitter, Inject, Input, Output} = require("../export-switch");

@Directive({
    selector: "[ngShiftDirective]",
    template: `<div>
        <h1>Directive ({{$ctrl.ngShiftDirectiveProp}})</h1>
        <div class="ng-shift-class-directive" ng-shift-directive-prop="$ctrl.ngShiftDirectiveProp+1"></div>
        <div ng-shift-attr-directive ng-shift-directive-prop="$ctrl.ngShiftDirectiveProp+2"></div>
        <ng-shift-elem-directive ng-shift-directive-prop="$ctrl.ngShiftDirectiveProp+3"></ng-shift-elem-directive>
    </div>`
})
export class NgShiftDirective {
    @Input() ngShiftDirectiveProp?: string;

    ngOnInit() {
        console.log(this.ngShiftDirectiveProp);
    }
}
