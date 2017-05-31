(function (window, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        window.returnExports = factory();
    }
}(this, function () {
    const toCamelCase = require("./helpers/to-camel-case");

    /**
     * @arg config: {
                id: string
                imports: Array<any>
                declarations: Array<any>
                exports: Array<any>
     *      }
     *
     * @return ModuleDecorator
     */
    function NgModule(config) {
        return function (target) {
            const ng1Module = angular.module(config.id, []);
            const declarations = config.declarations;

            for (var i = 0; i < declarations.length; i++) {
                let selectorNg2 = declarations[i].selector;
                let selectorNg1 = toCamelCase(selectorNg2);

                ng1Module.component(selectorNg1, declarations[i]);
            }
        }
    }

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
              selector?: string
     *        template?: string
     *      }
     *
     * @return ClassDecorator
     */
    function Component(config) {
        return function (target) {
            if (config) {
                if (config.template) {
                    target.template = config.template;
                }
                if (config.selector) {
                    target.selector = config.selector;
                }
            }

            // Lifehooks aliases
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

    return {
        Input: Input,
        Inject: Inject,
        Output: Output,
        Component: Component,
        NgModule: NgModule
    };
}));
