import toCamelCase from "./helpers/to-camel-case";

interface IComponentClass extends Function {
    $inject?: Array<string>;
    bindings?: {[key: string]: string};
    controller: Object;
    template: string;

    constructor: IComponentClass;
}

export function Input(alias?: string): PropertyDecorator {
    return function (target: IComponentClass, property: string) {
        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }

        target.constructor.bindings[property] = "<" + (alias ? alias : "");
    };
}

export function Output(alias?: string): PropertyDecorator {
    return function (target: IComponentClass, property: string) {
        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }

        const privateCallbackName = `__${property}`;
        const attrBinding = alias ? alias : property;
        let callbackCache: Function;
        let eventEmitterCache: EventEmitter;

        target.constructor.bindings[privateCallbackName] = `&${attrBinding}`;

        Object.defineProperty(target, privateCallbackName, {
            set: function (callback: Function) {
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
                    eventEmitterInstance.subscribe(function (eventData: any) {
                        callbackCache({$event: eventData});
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

export function Inject(dependencyName: string): ParameterDecorator {
    return function (target: IComponentClass, property: string, parameterIndex: number) {
        if (!target.$inject) {
            target.$inject = [];
        }

        target.$inject[parameterIndex] = dependencyName;
    };
}

export function Component<IComponentClass>(config?: {selector: string, template?: string}): ClassDecorator {
    return function (target: any) {
        if (config) {
            if (config.template) {
                target.template = config.template;
            }

            if (config.selector) {
                target.selector = config.selector;
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
    }
}

export class EventEmitter {
    private listeners: Array<Function> = [];

    emit(event: any = null) {
        this.listeners.forEach(callback => callback.call(null, event));
    }

    subscribe(callback: Function) {
        this.listeners.push(callback);
    }
}

export function NgModule(config) {
    return function (target) {
        let {id, imports, declarations} = config;
        let moduleIds = [];

        if (id) {
            target.id = id;
        }

        if (imports) {
            moduleIds = imports.map(mdl => mdl.id);
        }

        const ng1Module = angular.module(id, [...moduleIds]);

        for (var i = 0; i < declarations.length; i++) {
            let selectorNg2 = declarations[i].selector;
            let selectorNg1 = toCamelCase(selectorNg2);

            ng1Module.component(selectorNg1, declarations[i]);
        }
    }
}
