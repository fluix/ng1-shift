/**
 * Lifecycle hook that is called when any data-binding property of a directive/component changes.
 */
export interface OnChanges { ngOnChanges(changes: ng.IOnChangesObject): void; }

/**
 * Lifecycle hook that is called after data-bindings properties of a directive/component are initialized.
 */
export interface OnInit { ngOnInit(): void; }

/**
 * Lifecycle hook that is called when a directive/component is destroyed.
 */
export interface OnDestroy { ngOnDestroy(): void; }

/**
 * Lifecycle hook that is called after a component's view has been fully initialized.
 */
export interface AfterViewInit { ngAfterViewInit(): void; }
