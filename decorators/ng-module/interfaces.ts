interface NgModule {
    /**
     * Specifies a top level module name.
     */
    id?: string;
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
    /**
     *  Has current module as parameter and allows to make a direct registration of any ng1 entity
     */
    directRegister?: (ng1Module: any) => void
}

/**
 * Type of the Component decorator / constructor function.
 */
export interface NgModuleDecorator {
    (obj: NgModule): any;
}
