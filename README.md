# ng1-shift

[![bitHound Overall Score](https://www.bithound.io/github/readdle/ng1-shift/badges/score.svg)](https://www.bithound.io/github/readdle/ng1-shift)

Library allows you to write with Angular 2 syntax on Angular 1.5+. That will make your migration to Angular 2(or 4) more easier.

## How to install?
`npm i -S ng1-shift`

## Component
Decorator for class, which links class to component contoller.
It also passes property `template` as a static component value.

Lifecycle hooks:
- **ngOnInit** - links to $onInit
- **ngOnChanges** - links to $onChanges
- **ngOnDestroy** - links to $onDestroy

```typescript
import {Component, Inject, Input} from "ng1-shift";
import {UserDeleteErrorEntity} from "../store/entity/user-delete-error";

@Component({
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
