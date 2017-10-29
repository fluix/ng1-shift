const {Directive, EventEmitter, Input, Output} = require("../../export-switch");

@Directive({
    selector: "[ng-shift-attr-directive]"
})
export class NgShiftAttrDirective {
    @Input() ngShiftDirectiveProp?: string;
    @Output() ngShiftDirectiveOutput = new EventEmitter();
    private name = "NgShiftAttrDirective";

    ngOnInit() {
        console.log(this.name, this.ngShiftDirectiveProp);

        const titleSpan = document.createElement("span");
        titleSpan.textContent = this.name;

        document.querySelector("ng-shift-directive > div").appendChild(titleSpan);

        setTimeout(() => this.ngShiftDirectiveOutput.emit(), 1000);
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit", this.ngShiftDirectiveProp);
    }

    ngOnChanges() {
        console.log("onChanges", this.name);
    }
}
