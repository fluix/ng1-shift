const {Directive, EventEmitter, Input, Output} = require("../../export-switch");

@Directive({
    selector: ".ng-shift-class-directive"
})
export class NgShiftClassDirective {
    @Input() ngShiftDirectiveProp?: string;
    @Output() ngShiftDirectiveOutput = new EventEmitter();

    ngOnInit() {
        console.log("NgShiftClassDirective");

        setTimeout(() => this.ngShiftDirectiveOutput.emit(), 1000);
    }
}
