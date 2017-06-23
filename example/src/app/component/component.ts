const {Component, EventEmitter, Inject, Input, Output} = require("../export-switch");
const template = process.env.NG2 ? require("./template-ng2.html") : require("./template-ng1.html");

@Component({
    selector: "ng-shift-component",
    template
})
export class NgShiftComponent {
    @Input() prop: string;

    list: Array<string> = [];

    constructor(
        // @Inject("service1") private service,
        // @Inject("service3") private serviceX,
        // @Inject("service2") private serviceY
    ) {}

    add(label: string) {
        this.list.push(label);
    }

    remove() {
        this.list.splice(0, 1);
    }
}
