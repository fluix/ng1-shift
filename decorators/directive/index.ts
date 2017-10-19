import {Metakeys} from "../../models/metakeys";
import {DeclarationType} from "../../models/declaration-type";
import {getRestrictFromSelector} from "./helpers";

export function Directive<IComponentClass>({selector, template, templateUrl}: {
    selector?: string,
    template?: string,
    templateUrl?: string,
}): ClassDecorator {
    return (target: any) => {
        if (template) {
            target.template = template;
        }

        if (selector) {
            target.selector = selector;
        }

        // Lifecycle hooks aliases
        if (target.prototype.ngOnInit) {
            target.prototype.$onInit = target.prototype.ngOnInit;
        }

        if (target.prototype.ngOnDestroy) {
            target.prototype.$onDestroy = target.prototype.ngOnDestroy;
        }

        // Controller linking
        target.restrict = getRestrictFromSelector(target.selector);
        target.controller = target;
        target.controllerAs = target.controllerAs ? target.controllerAs : "$ctrl";
        target.bindToController = target.bindings ? target.bindings : {};

        // always isolated scope, unless set other
        target.scope = target.scope !== void 0 ? target.scope : true;

        Reflect.defineMetadata(Metakeys.type, DeclarationType.directive, target);

        return target;
    }
}
