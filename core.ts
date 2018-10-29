import {ComponentMetadataService} from "./decorators/component/metadata.service";

export * from "./decorators/ng-module";
export * from "./decorators/component";
export * from "./decorators/directive";
export * from "./decorators/lifecycle_hooks";

export function Input(alias?: string): PropertyDecorator {
    return function (target: any, property: string | symbol) {
        const componentMetadata = new ComponentMetadataService(target.constructor);

        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }
        const propName = String(property);
        const attrBinding = alias ? alias : propName;

        target.constructor.bindings[propName] = "<" + attrBinding;
        componentMetadata.addInput(propName, attrBinding);
    };
}

export function Output(alias?: string): PropertyDecorator {
    return function (target: any, property: string | symbol) {
        const componentMetadata = new ComponentMetadataService(target.constructor);

        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }

        const propName = String(property);
        const privateCallbackName = `__${propName}`;
        const attrBinding = alias ? alias : propName;

        target.constructor.bindings[privateCallbackName] = `&${attrBinding}`;
        componentMetadata.addOutput(propName, attrBinding);

        Object.defineProperty(target, privateCallbackName, {
            set: function (callback: Function) {
                if (!this.__callbackCache) {
                    this.__callbackCache = {};
                }

                if (typeof callback === "function") {
                    this.__callbackCache[propName] = callback;
                }
            },
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(target, propName, {
            set: function (eventEmitterInstance) {
                if (!this.__eventEmitterCache) {
                    this.__eventEmitterCache = {};
                }

                if (eventEmitterInstance && eventEmitterInstance.subscribe) {
                    eventEmitterInstance.subscribe((eventData: any) => {
                        if (typeof this.__callbackCache[propName] === "function") {
                            this.__callbackCache[propName]({$event: eventData});
                        }
                    });
                    this.__eventEmitterCache[propName] = eventEmitterInstance;
                }
            },
            get: function () {
                return this.__eventEmitterCache[propName];
            },
            enumerable: true,
            configurable: true
        });
    };
}

export function Inject(dependencyName: string): ParameterDecorator {
    return function (target: any, property: string | symbol, parameterIndex: number) {
        if (!target.$inject) {
            target.$inject = [];
        }

        target.$inject[parameterIndex] = dependencyName;
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
