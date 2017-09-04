function DiTokenFactory(config: any) {
    return function (target: any) {
        target.ng1ServiceName = config.id;
    };
}

@DiTokenFactory({id: "$q"})
export class NgQ {}

@DiTokenFactory({id: "$transitions"})
export class NgTransitions {}

@DiTokenFactory({id: "$transition$"})
export class NgTransition {}

@DiTokenFactory({id: "$stateProvider"})
export class NgStateProvider {}

@DiTokenFactory({id: "$stateParams"})
export class NgStateParams {}

@DiTokenFactory({id: "$scope"})
export class NgScope {}

@DiTokenFactory({id: "$rootScope"})
export class NgRootScope {}

@DiTokenFactory({id: "$element"})
export class NgElement {}

@DiTokenFactory({id: "$window"})
export class NgWindow {}

@DiTokenFactory({id: "$location"})
export class NgLocation {}

@DiTokenFactory({id: "$transclude"})
export class NgTransclude {}

@DiTokenFactory({id: "$timeout"})
export class NgTimeout {}

@DiTokenFactory({id: "$document"})
export class NgDocument {}

@DiTokenFactory({id: "$compile"})
export class NgCompile {}

@DiTokenFactory({id: "$controller"})
export class NgController {}

@DiTokenFactory({id: "$attrs"})
export class NgAttrs {}

@DiTokenFactory({id: "$state"})
export class NgState {}

@DiTokenFactory({id: "$provide"})
export class NgProvide {}

@DiTokenFactory({id: "$locationProvider"})
export class NgLocationProvider {}

@DiTokenFactory({id: "$httpProvider"})
export class NgHttpProvider {}

@DiTokenFactory({id: "$urlMatcherFactoryProvider"})
export class NgUrlMatcherFactoryProvider {}

@DiTokenFactory({id: "$sceDelegateProvider"})
export class NgSceDelegateProvider {}

@DiTokenFactory({id: "$urlRouterProvider"})
export class NgUrlRouterProvider {}

@DiTokenFactory({id: "$http"})
export class NgHttp {}

@DiTokenFactory({id: "$interval"})
export class NgInterval {}

@DiTokenFactory({id: "$sce"})
export class NgSce {}
