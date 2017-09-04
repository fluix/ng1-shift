export function Directive(config?: {selector?: string}) {
    return function (target: any) {
        if (config) {
            if (config.selector) {
                target.selector = config.selector;
                target.isDirective = true;
            }
        }

        /*
            Lifecycle hooks aliases
        */
        if (target.prototype.ngOnInit) {
            target.prototype.$onInit = target.prototype.ngOnInit;
        }

        if (target.prototype.ngOnChanges) {
            target.prototype.$onChanges = target.prototype.ngOnChanges;
        }

        if (target.prototype.ngOnDestroy) {
            target.prototype.$onDestroy = target.prototype.ngOnDestroy;
        }

        /*
            Controller linking
        */
        target.controller = target;
    }
}
