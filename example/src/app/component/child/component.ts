const {Component, EventEmitter, Inject, Input, Output} = require("../../export-switch");
const template = process.env.NG2 ? require("./template-ng2.html") : require("./template-ng1.html");

@Component({
    selector: "child-app",
    template
})
export class ChildAppComponent {
    @Output() onAdd = new EventEmitter();
    @Output() onRemove = new EventEmitter();

    add() {
        this.onAdd.emit("Added " + Math.random());
    }

    remove() {
        this.onRemove.emit();
    }
}
