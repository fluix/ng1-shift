# ng1-shift

[![bitHound Overall Score](https://www.bithound.io/github/readdle/ng1-shift/badges/score.svg)](https://www.bithound.io/github/readdle/ng1-shift)

Library allows you to write with Angular 2 syntax on Angular 1.5+. That will make your migration to Angular 2(or 4) more easier.

## How to install?
`npm i -S ng1-shift`

## NgModule
Decorator for class, which allows to register any Angular 2 entity.

##### Getting started:
* Install `reflect-metadata` as a dependency in your project.
* `NgModule` has `id` field which should marks name of top level component
and should be used as `ng-app` name in your `index.html` file.

```typescript
@NgModule({
    id: "app-module",
    imports: [HomeModule],
    declarations: [AppComponent],
    providers: [AppService]
})
export class AppModule {}
```

Equals to:
```typescript
angular
    .module("app-module", ["homeModuleName"])
    .component("appComponentName", AppComponent)
    .service("appServiceName", AppService);
```

##### Direct registration:
`NgModule` has addition field `directRegister` with is represented by function with
current Angular 1 module as argument.
This field designed for gradually migration of your project in case if some entities
is not ready for migration.

```typescript
@NgModule({
    id: "app-module",
    imports: [HomeModule],
    directRegister: (ng1AppModule) => {
        ng1AppModule.
            .component("appComponentName", AppComponent)
            .service("appServiceName", AppService);
    }
})
export class AppModule {}
```

##### Version compatibility:
`NgModule` `imports` field also can accept string which may represent Angular 1
dependency e.g. `"ui-router"` or module.


```typescript
angular.module("child-module", []);

@NgModule({
    imports: [
        "ui-router",
        "child-module"
    ]
})
export class ParentModule {}
```

Also if you need to tie Angular 2 module with Angular 1 it
could be implemented by `ng1ShiftModuleName` property which is stored
in your module.

```typescript
@NgModule({})
export class ChildModule {}

angular.module("parent-module", [ChildModule.ng1ShiftModuleName]);
```


## Dependency injection
Implements Angular 2 DI design pattern.


```typescript
@NgModule({
    declarations: [AppComponent],
    providers: [AppService]
})
export class AppModule {}


@Component({
    selector: "component-name",
    template: `<h1>Place your template here</h1>`,
})
export class AppComponent {

    constructor(private appService: AppService) {
    }
}
```

Equals to:
```typescript
angular.module("app-module", [])
    .component("appComponentName", AppComponent)
    .service("appServiceName", AppService);

export class AppComponent {

    static $inject = ["appServiceName"]

    constructor(private appService: IAppService) {
    }
}
```

##### Ng1Shift DI Tokens
`Ng1Shift` provides a list of DI Tokens which can be used in a way of Angular 2 DI Tokens
and allows you to get Angular 1 services.

* NgQ
* NgTransitions
* NgTransition
* NgStateProvider
* NgStateParams
* NgScope
* NgRootScope
* NgElement
* NgWindow
* NgLocation
* NgTransclude
* NgTimeout
* NgDocument
* NgCompile
* NgController
* NgAttrs
* NgState
* NgProvide
* NgLocationProvider
* NgHttpProvider
* NgUrlMatcherFactoryProvider
* NgSceDelegateProvider
* NgUrlRouterProvider
* NgHttp
* NgInterval
* NgSce


```typescript
@NgModule({
    id: "app-module",
    declarations: [AppComponent]
})
export class AppModule {}
```

```typescript
import {Component, Ng1ShiftQ} from "ng1-shift";

@Component({
    selector: "component-name",
    template: `<h1>Place your template here</h1>`,
})
export class AppComponent {

    constructor(private $q: Ng1ShiftQ) {
    }
}
```

Equals to:

```typescript
angular
    .module("app-module", [])
    .component("appComponent", AppComponent)
```

```typescript
export class AppComponent {
    static $inject = ["$q"];

    constructor(private $q: ng.IQService) {
    }
}
```

## Injectable
Decorator for class, which allows to inject service into service.
Note: it's required by each class of your app.

```typescript
import {Injectable, Ng1ShiftQ} from "ng1-shift";

@Injectable()
export class Service {

    constructor(private $q: Ng1ShiftQ) {
    }
}
```

Equals to:

```typescript
export class Service {
    static $inject = ["$q"];

    constructor(private $q: ng.IQService) {
    }
}
```

## Component
Decorator for class, which links class to component contoller.
It also passes property `template` as a static component value and `selector` as
a component name.

Lifecycle hooks:
- **ngOnInit** - links to $onInit
- **ngOnChanges** - links to $onChanges
- **ngOnDestroy** - links to $onDestroy

```typescript
import {Component, Inject, Input} from "ng1-shift";
import {UserDeleteErrorEntity} from "../store/entity/user-delete-error";

@Component({
    selector: "component-name",
    template: `
        <h1>Place your template here</h1>
    `,
})
export class PlaygroundComponent implements ng.IController {
    ngOnInit() {
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
    }
}
```
Equals to:
```typescript
export class PlaygroundComponent implements ng.IController {
    static controller = PlaygroundComponent;
    static template = `
        <h1>Place your template here</h1>
    `;

    $onInit() {
    }

    $onChanges() {
    }

    $onDestroy() {
    }
}
```


## Directive
Decorator for class, which links class to directive contoller.
It also passes property `selector` as a directive selector.

Lifecycle hooks:
- **ngOnInit** - links to $onInit
- **ngAfterViewInit** - links to $postLink
- **ngOnChanges** - links to $onChanges
- **ngOnDestroy** - links to $onDestroy

```typescript
import {Directive} from "ng1-shift";

@Directive({
    selector: `.ngClassDirective`,
})
export class PlaygroundDirective implements ng.IController {
    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
    }
}
```
Equals to:
```typescript
export directiveInstance() {
    return {
        controller: PlaygroundDirective,
        restrict: "C"
    }
}

class PlaygroundDirective implements ng.IController {
    $onInit() {
    }

    $postLink() {
    }

    $onChanges() {
    }

    $onDestroy() {
    }
}
```


## Input
Property decorator for bindings. Literary puts binding property name into static object `bindings` as one-way binding "<".

```typescript
class DogComponent {
    @Input() name: string;
}
```
Equals to:
```typescript
class DogComponent {
    static bindings = {
        name: "<"
    };

    name: string;
}
```

In order to setup two-way binding, you should add `@Input` for that property and `@Output` with 'Change' postfix property.
```typescript
class DogComponent {
    @Input() name: string;
    @Output() nameChange = new EventEmitter();
}
```
Equals to:
```typescript
class DogComponent {
    static bindings = {
        name: "=",
        nameChange: "&"
    };

    name: string;
    nameChange: Function;
}

```


## Output
Property decorator for callback bindings. Literary puts binding property name into static object `bindings` as callback binding "&".

```typescript
class CatComponent {
    @Output("onAliasCallback") onCallback: Function;
}
```
Equals to:
```typescript
class CatComponent {
    static bindings = {
        onCallback: "&onAliasCallback"
    };

    onCallback: Function;
}
```

## Inject
Parameter decorator for injection. Works a bit differ from **@Inject** in Angular 2.
Just pushes specified injection into static property **$inject**.

```typescript
class UserComponent {
    constructor(
        @Inject("userDataService") private userDataService: IUserDataService
    ) {
    }
}
```
Equals to:
```typescript
class UserComponent {
    static $inject = ["userDataService"];

    constructor(private userDataService: IUserDataService) {
    }
}
```
