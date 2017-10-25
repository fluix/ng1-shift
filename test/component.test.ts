import {Component} from "../index";

@Component({
    template: `<div></div>`
})
class Test {
    ngOnInit() {}
    ngAfterViewInit() {}
    ngOnChanges() {}
    ngOnDestroy() {}
}

describe("Component decorator", function() {
    let instance: any;

    beforeEach(function() {
        instance = new Test();
    });

    test("should link `controller` to class", function () {
        expect(instance.constructor.controller).toEqual(Test);
    });

    test("should pass `template` to component", function () {
        expect(instance.constructor.template).toBeDefined();
    });

    test("should link `ngOnInit` to `$onInit`", function () {
        expect(instance.$onInit).toBeDefined();
        expect(instance.$onInit).toEqual(instance.ngOnInit);
    });

    test("should link `ngAfterViewInit` to `$postLink`", function () {
        expect(instance.$postLink).toBeDefined();
        expect(instance.$postLink).toEqual(instance.ngAfterViewInit);
    });

    test("should link `ngOnChanges` to `$onChanges`", function () {
        expect(instance.$onChanges).toBeDefined();
        expect(instance.$onChanges).toEqual(instance.ngOnChanges);
    });

    test("should link `ngOnDestroy` to `$onDestroy`", function () {
        expect(instance.$onDestroy).toBeDefined();
        expect(instance.$onDestroy).toEqual(instance.ngOnDestroy);
    });
});
