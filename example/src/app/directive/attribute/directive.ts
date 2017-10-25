const {Directive, EventEmitter, Input, Output} = require("../../export-switch");

@Directive({
    selector: "[ng-shift-attr-directive]"
})
export class NgShiftAttrDirective {
    @Input() ngShiftDirectiveProp?: string;
    @Output() ngShiftDirectiveOutput = new EventEmitter();

    ngOnInit() {
        console.log(this.constructor.name);

        setTimeout(() => this.ngShiftDirectiveOutput.emit(), 1000);
    }

    ngOnChanges() {
        console.log("onChanges", this.constructor.name);
    }
}
