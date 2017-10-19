const {Directive, Input} = require("../../export-switch");

@Directive({
    selector: ".ngShiftClassDirective",
    template: `<span>Class Directive ({{$ctrl.ngShiftDirectiveProp}})</span>`
})
export class NgShiftClassDirective {
    @Input() ngShiftDirectiveProp?: string;
}
