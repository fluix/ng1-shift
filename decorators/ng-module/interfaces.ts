interface NgModule {
    /**
     * Specifies a list of modules whose exported entities should be available to templates in this module.
     */
    imports?: Array<any>;
    /**
     * Specifies a list of components/directives which is available to this module.
     */
    declarations?: Array<any>;
    /**
     * Specifies a list of dependecies which should be injected to this module.
     */
    providers?: Array<any>;
}

/**
 * Type of the Component decorator / constructor function.
 */
export interface NgModuleDecorator {
    (obj: NgModule): any;
}
