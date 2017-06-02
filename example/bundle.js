(function () {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function Input(alias) {
    return function (target, property) {
        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }
        target.constructor.bindings[property] = "<" + (alias ? alias : "");
    };
}
function Output(alias) {
    return function (target, property) {
        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }
        const privateCallbackName = `__${property}`;
        const attrBinding = alias ? alias : property;
        let callbackCache;
        let eventEmitterCache;
        target.constructor.bindings[privateCallbackName] = `&${attrBinding}`;
        Object.defineProperty(target, privateCallbackName, {
            set: function (callback) {
                if (typeof callback === "function") {
                    callbackCache = callback;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(target, property, {
            set: function (eventEmitterInstance) {
                if (eventEmitterInstance && eventEmitterInstance.subscribe) {
                    eventEmitterInstance.subscribe(function (eventData) {
                        callbackCache({ $event: eventData });
                    });
                    eventEmitterCache = eventEmitterInstance;
                }
            },
            get: function () {
                return eventEmitterCache;
            },
            enumerable: true,
            configurable: true
        });
    };
}
function Inject(dependencyName) {
    return function (target, property, parameterIndex) {
        if (!target.$inject) {
            target.$inject = [];
        }
        target.$inject[parameterIndex] = dependencyName;
    };
}
function Component(config) {
    return function (target) {
        if (config) {
            if (config.template) {
                target.template = config.template;
            }
        }
        // Lifecycle hooks aliases
        if (target.prototype.ngOnInit) {
            target.prototype.$onInit = target.prototype.ngOnInit;
        }
        if (target.prototype.ngOnChanges) {
            target.prototype.$onChanges = target.prototype.ngOnChanges;
        }
        if (target.prototype.ngOnDestroy) {
            target.prototype.$onDestroy = target.prototype.ngOnDestroy;
        }
        // Controller linking
        target.controller = target;
        return target;
    };
}

class EventEmitter {
    constructor() {
        this.listeners = [];
    }
    emit(event = {}) {
        this.listeners.forEach(cb => cb.call(null, event));
    }
    subscribe(cb) {
        this.listeners.push(cb);
    }
}
let AppComponent = class AppComponent {
    constructor(service, serviceY, serviceX) {
        this.service = service;
        this.serviceY = serviceY;
        this.serviceX = serviceX;
        this.list = [];
    }
    add(label) {
        this.list.push(label);
    }
    remove() {
        this.list.splice(0, 1);
    }
};
__decorate([
    Input()
], AppComponent.prototype, "prop", void 0);
AppComponent = __decorate([
    Component({
        template: `<div>
        <h1>Component content</h1>

        <child-app on-add="$ctrl.add($event)" on-remove="$ctrl.remove()"></child-app>

        <ul ng-if="$ctrl.list.length > 0">
            <li ng-repeat="label in $ctrl.list">{{::label}}</li>
        </ul>
    </div>`
    }),
    __param(0, Inject("service1")),
    __param(1, Inject("service3")),
    __param(2, Inject("service2"))
], AppComponent);
let ChildAppComponent = class ChildAppComponent {
    constructor() {
        this.onAdd = new EventEmitter;
        this.onRemove = new EventEmitter;
    }
    add() {
        this.onAdd.emit("Added " + Math.random());
    }
    remove() {
        this.onRemove.emit();
    }
};
__decorate([
    Output()
], ChildAppComponent.prototype, "onAdd", void 0);
__decorate([
    Output()
], ChildAppComponent.prototype, "onRemove", void 0);
ChildAppComponent = __decorate([
    Component({
        template: `<div>
        <p>Child component buttons:</p>
        <div>
            <button ng-click="$ctrl.add()">Add</button>
            <button ng-click="$ctrl.remove()">Remove</button>
        </div>
    </div>`
    })
], ChildAppComponent);

class Service1 {
    open1() { }
}
class Service2 {
    open2() { }
}
class Service3 {
    open3() { }
}
class Service4 {
    open4() { }
}
angular.module("ng1-shift", [])
    .service("service1", Service1)
    .service("service2", Service2)
    .service("service3", Service3)
    .service("service4", Service4)
    .component("appComponent", AppComponent)
    .component("childApp", ChildAppComponent);

}());
