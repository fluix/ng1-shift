import {Metakeys} from "../../models/metakeys";
import {DeclarationType} from "../../models/declaration-type";
import {getRestrictFromSelector} from "./helpers";
import kebabCaseToCamelCase from "../../helpers/kebab-case-to-camel-case";

export function Directive<IComponentClass>({selector}: {
    selector?: string
}): ClassDecorator {
    return (target: any) => {
        if (selector) {
            target.selector = kebabCaseToCamelCase(selector);
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
        target.restrict = getRestrictFromSelector(target.selector);
        target.controller = target;
        // IE11 doesn't support function.name
        target.controllerAs = target.controllerAs || target.name || target.selector;
        target.bindToController = target.bindings ? target.bindings : {};

        // always isolated scope, unless set other
        target.scope = target.scope !== void 0 ? target.scope : false;

        Reflect.defineMetadata(Metakeys.type, DeclarationType.directive, target);

        return target;
    };
}
