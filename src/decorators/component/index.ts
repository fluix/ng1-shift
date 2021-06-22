import {DeclarationType} from "../../models/declaration-type";
import {Metakeys} from "../../models/metakeys";
import {replaceTwoWayBindings} from "./helpers";

interface ComponentConfig {
    selector?: string;
    template?: string;
    styles?: Array<any>; // added for compatibility with Angular12 with ngUpgrade
}

export function Component(config?: ComponentConfig): ClassDecorator {
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

        if (target.prototype.ngAfterViewInit) {
            target.prototype.$postLink = target.prototype.ngAfterViewInit;
        }

        if (target.prototype.ngOnChanges) {
            target.prototype.$onChanges = target.prototype.ngOnChanges;
        }

        if (target.prototype.ngOnDestroy) {
            target.prototype.$onDestroy = target.prototype.ngOnDestroy;
        }

        // Controller linking
        target.controller = target;

        replaceTwoWayBindings(target);

        Reflect.defineMetadata(Metakeys.type, DeclarationType.component, target);

        return target;
    };
}
