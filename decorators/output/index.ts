import {IComponentClass} from "../component/interfaces";
import {ComponentMetadataService} from "../component/metadata.service";

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
