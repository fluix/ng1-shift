(function (window, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        window.returnExports = factory();
    }
}(this, function () {
    /**
     * @arg alias: string
     *
     * @return PropertyDecorator
     */
    function Input(alias) {
        return function (target, property) {
            if (!target.constructor.bindings) {
                target.constructor.bindings = {};
            }

            target.constructor.bindings[property] = "<" + (alias ? alias : "");
        };
    }

    /**
     * @arg alias: string
     *
     * @return PropertyDecorator
     */
    function Output(alias) {
        return function (target, property) {
            if (!target.constructor.bindings) {
                target.constructor.bindings = {};
            }

            target.constructor.bindings[property] = "&" + (alias ? alias : "");
        };
    }

    /**
     * @arg dependencyName: string
     *
     * @return ParameterDecorator
     */
    function Inject(dependencyName) {
        return function (target, property, parameterIndex) {
            if (!target.$inject) {
                target.$inject = [];
            }

            target.$inject.push(dependencyName);
        };
    }

    /**
     * @arg config: {
     *        template?: string
     *      }
     *
     * @return ClassDecorator
     */
    function Component(config) {
        return function (target) {
            if (config.template) {
                target.template = config.template;
            }

            // Lifehooks aliases
            if (target.ngOnInit) {
                target.$onInit = target.ngOnInit;
            }

            if (target.ngOnChanges) {
                target.$onChanges = target.ngOnChanges;
            }

            if (target.ngOnDestroy) {
                target.$onDestroy = target.ngOnDestroy;
            }

            // Controller linking
            target.controller = target;

            return target;
        }
    }

    return {
        Input: Input,
        Inject: Inject,
        Component: Component
    };
}));
