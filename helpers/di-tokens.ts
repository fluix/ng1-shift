function DiTokenFactory(config: any) {
    return function (target: any) {
        target.ng1ServiceName = config.id;
    };
}

@DiTokenFactory({id: "$q"})
export class Ng1ShiftQ {}

@DiTokenFactory({id: "$transitions"})
export class Ng1ShiftTransitions {}

@DiTokenFactory({id: "$transition$"})
export class Ng1ShiftTransition {}

@DiTokenFactory({id: "$stateProvider"})
export class Ng1ShiftStateProvider {}

@DiTokenFactory({id: "$stateParams"})
export class Ng1ShiftStateParams {}

@DiTokenFactory({id: "$scope"})
export class Ng1ShiftScope {}

@DiTokenFactory({id: "$rootScope"})
export class Ng1ShiftRootScope {}

@DiTokenFactory({id: "$element"})
export class Ng1ShiftElement {}

@DiTokenFactory({id: "$window"})
export class Ng1ShiftWindow {}

@DiTokenFactory({id: "$location"})
export class Ng1ShiftLocation {}

@DiTokenFactory({id: "$transclude"})
export class Ng1ShiftTransclude {}

@DiTokenFactory({id: "$timeout"})
export class Ng1ShiftTimeout {}

@DiTokenFactory({id: "$document"})
export class Ng1ShiftDocument {}

@DiTokenFactory({id: "$compile"})
export class Ng1ShiftCompile {}

@DiTokenFactory({id: "$controller"})
export class Ng1ShiftController {}

@DiTokenFactory({id: "$attrs"})
export class Ng1ShiftAttrs {}

@DiTokenFactory({id: "$state"})
export class Ng1ShiftState {}

@DiTokenFactory({id: "$provide"})
export class Ng1ShiftProvide {}

@DiTokenFactory({id: "$locationProvider"})
export class Ng1ShiftLocationProvider {}

@DiTokenFactory({id: "$httpProvider"})
export class Ng1ShiftHttpProvider {}

@DiTokenFactory({id: "$urlMatcherFactoryProvider"})
export class Ng1ShiftUrlMatcherFactoryProvider {}

@DiTokenFactory({id: "$sceDelegateProvider"})
export class Ng1ShiftSceDelegateProvider {}

@DiTokenFactory({id: "$urlRouterProvider"})
export class Ng1ShiftUrlRouterProvider {}

@DiTokenFactory({id: "$http"})
export class Ng1ShiftHttp {}

@DiTokenFactory({id: "$interval"})
export class Ng1ShiftInterval {}

@DiTokenFactory({id: "$sce"})
export class Ng1ShiftSce {}
