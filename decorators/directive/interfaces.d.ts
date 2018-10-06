/**
 * Type of the Component decorator / constructor function.
 */
export interface Directive {
    selector: string;
    template?: string;
    templateUrl?: string;
}

/**
 * Type of the Component decorator / constructor function.
 */
export interface DirectiveDecorator {
    (obj: Directive): any;
    new (obj: Directive): Directive;
}
