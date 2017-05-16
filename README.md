# ng1-shift

Library allows you to write with Angular 2 syntax on Angular 1.5+. That will make your migration to Angular 2(or 4) more easier.

## API

### Component
Decorator for class, which links class to component contoller.
It also passes property `template` as a static component value.

Lifetime hooks:
**ngOnInit** - links to $onInit
**ngOnChanges** - links to $onChanges
**ngOnDestroy** - links to $onDestroy

### Input
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

### Inject
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

### Example
```typescript
import {Component, Inject, Input} from "ng1-shift";
import {UserDeleteErrorEntity} from "../store/entity/user-delete-error";

@Component({
    template: require("./playground.html"),
})
export class PlaygroundComponent implements ng.IController {
    @Input() userDeleteErrors: Array<UserDeleteErrorEntity>;

    constructor(
        @Inject("sessionDataService") private sessionDataService: fl.core.services.ISessionDataService
    ) {
        // console.info("constructor", this.userDeleteErrors, this.sessionDataService);
    }

    ngOnInit() {
    }
}
```
