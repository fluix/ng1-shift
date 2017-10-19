const {Directive, Input} = require("../../export-switch");

@Directive({
    selector: "ngShiftElemDirective",
    template: `<span>Element Directive ({{$ctrl.ngShiftDirectiveProp}})</span>`
})
export class NgShiftElemDirective {
    @Input() ngShiftDirectiveProp?: string;
}
