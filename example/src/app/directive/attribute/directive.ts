const {Directive, EventEmitter, Input, Output} = require("../../export-switch");

@Directive({
    selector: "[ng-shift-attr-directive]"
})
export class NgShiftAttrDirective {
    @Input() ngShiftDirectiveProp?: string;
    @Output() ngShiftDirectiveOutput = new EventEmitter();

    ngAfterViewInit() {
        console.log("ngAfterViewInit", this.ngShiftDirectiveProp);
    }

    ngOnInit() {
        console.log(this.constructor.name, this.ngShiftDirectiveProp);

        setTimeout(() => this.ngShiftDirectiveOutput.emit(), 1000);
    }

    ngOnChanges() {
        console.log("onChanges", this.constructor.name);
    }
}
