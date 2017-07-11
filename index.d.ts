import {NgModuleDecorator} from "./decorators/ng-module/interfaces";

/**
 * NgModule decorator and metadata.
 */
export declare const NgModule: NgModuleDecorator;

export interface Component {
    /**
     * Specifies an inline template for an Angular component.
     */
    template?: string;
    selector?: string;
}

/**
 * Type of the Component decorator / constructor function.
 */
export interface ComponentDecorator {
    (obj: Component): any;
    new (obj: Component): Component;
}

/**
 * Component decorator and metadata.
 */
export declare const Component: ComponentDecorator;


/**
 * Type of the Inject metadata.
 */
export interface Inject {
    token: any;
}
/**
 * Inject decorator and metadata.
 */
export declare const Inject: InjectDecorator;

/**
 * Type of the Inject decorator / constructor function.
 */
export interface InjectDecorator {
    (token: any): any;
    new (token: any): Inject;
}


/**
 *  Type of the Input metadata.
 */
export interface Input {
    /**
     * Name used when instantiating a component in the template.
     */
    bindingPropertyName?: string;
}

/**
 * Input decorator and metadata.
 */
export declare const Input: InputDecorator;

/**
 * Type of the Input decorator / constructor function.
 */
export interface InputDecorator {
    /**
     * Declares a data-bound input property.
     *
     * Angular automatically updates data-bound properties during change detection.
     *
     * `Input` takes an optional parameter that specifies the name
     * used when instantiating a component in the template. When not provided,
     * the name of the decorated property is used.
     *
     * ### Example
     *
     * The following example creates a component with two input properties.
     *
     * ```typescript
     * @Component({
     *   template: require("some.html")
     * })
     *
     * class App {
     *   @Input test: string;
     * }
     * ```
     */
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
}


/**
 *  Type of the Output metadata.
 */
export interface Output {
    /**
     * Name used when instantiating a component in the template.
     */
    bindingPropertyName?: string;
}

/**
 * Output decorator and metadata.
 */
export declare const Output: OutputDecorator;

/**
 * Type of the Output decorator / constructor function.
 */
export interface OutputDecorator {
    /**
     * Declares a data-bound input property.
     *
     * Angular automatically updates data-bound properties during change detection.
     *
     * `Output` takes an optional parameter that specifies the name
     * used when instantiating a component in the template. When not provided,
     * the name of the decorated property is used.
     *
     * ### Example
     *
     * The following example creates a component with two input properties.
     *
     * ```typescript*
     * @Component({
     *   template: require("some.html")
     * })
     *
     * class App {
     *   @Output() onRowClick: Function;
     * }
     * ```
     */
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
}


export interface EventEmitter {
    emit(event?: any);
    subscribe(callback: Function);
}
