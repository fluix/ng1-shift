const {Directive, EventEmitter, Input, Output} = require("../../export-switch");

@Directive({
    selector: "ng-shift-elem-directive"
})
export class NgShiftElemDirective {
    @Input() ngShiftDirectiveProp?: string;
    @Output() ngShiftDirectiveOutput = new EventEmitter();
    private name = "NgShiftElemDirective";

    ngOnInit() {
        console.log(this.name);

        const titleSpan = document.createElement("span");
        titleSpan.textContent = `, ${this.name}`;

        document.querySelector("ng-shift-directive > div").appendChild(titleSpan);

        setTimeout(() => this.ngShiftDirectiveOutput.emit(), 1000);
    }

    ngOnChanges() {
        console.log("onChanges", this.name);
    }
}
