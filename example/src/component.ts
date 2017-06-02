import {Component, Inject, Input, Output} from "../../index";

class EventEmitter {
    private listeners: Array<Function> = [];

    emit(event?: any = {}) {
        this.listeners.forEach(cb => cb.call(null, event));
    }

    subscribe(cb: Function) {
        this.listeners.push(cb);
    }
}

@Component({
    template: `<div>
        <h1>Component content</h1>

        <child-app on-add="$ctrl.add($event)" on-remove="$ctrl.remove()"></child-app>

        <ul ng-if="$ctrl.list.length > 0">
            <li ng-repeat="label in $ctrl.list">{{::label}}</li>
        </ul>
    </div>`
})
export class AppComponent {
    @Input() prop: string;

    list: Array<string> = [];

    constructor(
        @Inject("service1") private service,
        @Inject("service3") private serviceX,
        @Inject("service2") private serviceY
    ) {}

    add(label: string) {
        this.list.push(label);
    }

    remove() {
        this.list.splice(0, 1);
    }
}

@Component({
    template: `<div>
        <p>Child component buttons:</p>
        <div>
            <button ng-click="$ctrl.add()">Add</button>
            <button ng-click="$ctrl.remove()">Remove</button>
        </div>
    </div>`
})
export class ChildAppComponent {
    @Output() onAdd: EventEmitter = new EventEmitter;
    @Output() onRemove: EventEmitter = new EventEmitter;

    add() {
        this.onAdd.emit("Added " + Math.random());
    }

    remove() {
        this.onRemove.emit();
    }
}
