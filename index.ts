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

export function NgModule(config: any) {
    return function (target: any) {
        const {imports, declarations, providers} = config;
        let moduleIds = [];

        if (imports) {
            moduleIds = imports
                .filter((mdl: any) => mdl !== void 0)
                .map((mdl: any) => mdl.name);
        }

        const ng1Module = angular.module(target.name, [...moduleIds]);

        if (declarations) {
            declarations.forEach((declaration: any) => {
                const selectorNg2 = declaration.selector;
                const selectorNg1 = toCamelCase(selectorNg2);

                ng1Module.component(selectorNg1, declaration);
            });
        }

        if (providers) {
            const FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
            const FN_ARG_SPLIT = /,/;
            const FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
            const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

            declarations.forEach((declaration: any) => {
                const fnString = declaration.toString();

                fnString.split(FN_ARG_SPLIT);
                fnString.replace(STRIP_COMMENTS, "");
                const args = fnString.match(FN_ARGS)[1];

                if (args !== "") {
                    if (!declaration.$inject) {
                        declaration.$inject = [];
                    }

                    const types = Reflect.getMetadata("design:paramtypes", declaration);
                    const injectedServices = types.map((a: any) => a.name);

                    providers.forEach((provider: any) => {
                        const serviceKey = provider.name;
                        const injectIndex = injectedServices.indexOf(serviceKey);

                        declaration.$inject[injectIndex] = serviceKey;
                        ng1Module.service(serviceKey, provider);
                    });

                }
            });
        }
    }
}
