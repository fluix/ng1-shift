import {ComponentMetadataService} from "./decorators/component/metadata.service";
import {IComponentClass} from "./decorators/component/interfaces";

export * from "./decorators/ng-module";
export * from "./decorators/component";
export * from "./decorators/directive";
export * from "./decorators/lifecycle_hooks";

export function Input(alias?: string): PropertyDecorator {
    return function (target: IComponentClass, property: string) {
        const componentMetadata = new ComponentMetadataService(target.constructor);

        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }

        const attrBinding = alias ? alias : property;

        target.constructor.bindings[property] = "<" + attrBinding;
        componentMetadata.addInput(property, attrBinding);
    };
}

export function Output(alias?: string): PropertyDecorator {
    return function (target: IComponentClass, property: string) {
        const componentMetadata = new ComponentMetadataService(target.constructor);

        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }

        const privateCallbackName = `__${property}`;
        const attrBinding = alias ? alias : property;

        target.constructor.bindings[privateCallbackName] = `&${attrBinding}`;
        componentMetadata.addOutput(property, attrBinding);

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

export class EventEmitter {
    private listeners: Array<Function> = [];

    emit(event: any = null) {
        this.listeners.forEach(callback => callback.call(null, event));
    }

    subscribe(callback: Function) {
        this.listeners.push(callback);
    }
}
