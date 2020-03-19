export interface IComponentClass extends Function {
    $inject?: Array<string>;
    bindings?: {[key: string]: string};
    selector?: string;
    controller: Object;
    template: string;

    constructor: IComponentClass;
}
