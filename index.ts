import {DeclarationType} from "./models/declaration-type";
import {Metakeys} from "./models/metakeys";

export * from "./decorators/ng-module";
export * from "./decorators/directive";
export * from "./decorators/lifecycle_hooks";

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

        target.constructor.bindings[privateCallbackName] = `&${attrBinding}`;

        Object.defineProperty(target, privateCallbackName, {
            set: function (callback: Function) {
                if (!this.__callbackCache) {
                    this.__callbackCache = {};
                }

                if (typeof callback === "function") {
                    this.__callbackCache[property] = callback;
                }
            },
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(target, property, {
            set: function (eventEmitterInstance) {
                if (!this.__eventEmitterCache) {
                    this.__eventEmitterCache = {};
                }

                if (eventEmitterInstance && eventEmitterInstance.subscribe) {
                    eventEmitterInstance.subscribe((eventData: any) => {
                        if (typeof this.__callbackCache[property] === "function") {
                            this.__callbackCache[property]({$event: eventData});
                        }
                    });
                    this.__eventEmitterCache[property] = eventEmitterInstance;
                }
            },
            get: function () {
                return this.__eventEmitterCache[property];
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

export function Component(config?: {selector?: string, template?: string}): ClassDecorator {
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

        if (target.prototype.ngAfterViewInit) {
            target.prototype.$postLink = target.prototype.ngAfterViewInit;
        }

        if (target.prototype.ngOnChanges) {
            target.prototype.$onChanges = target.prototype.ngOnChanges;
        }

        if (target.prototype.ngOnDestroy) {
            target.prototype.$onDestroy = target.prototype.ngOnDestroy;
        }

        // Controller linking
        target.controller = target;

        Reflect.defineMetadata(Metakeys.type, DeclarationType.component, target);

        return target;
    };
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
