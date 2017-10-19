const {Directive, Input} = require("../../export-switch");

@Directive({
    selector: "[ngShiftAttrDirective]",
    template: `<span>Attribute Directive ({{$ctrl.ngShiftDirectiveProp}})</span>`
})
export class NgShiftAttrDirective {
    @Input() ngShiftDirectiveProp?: string;
}
