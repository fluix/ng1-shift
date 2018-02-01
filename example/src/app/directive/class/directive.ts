const {Directive, EventEmitter, Input, Output} = require("../../export-switch");

@Directive({
    selector: ".ng-shift-class-directive"
})
export class NgShiftClassDirective {
    @Input() ngShiftDirectiveProp?: string;
    @Output() ngShiftDirectiveOutput = new EventEmitter();
    private name = "NgShiftClassDirective";

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
