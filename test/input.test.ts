import "reflect-metadata";
import {Input} from "../decorators/input";

class Test {
    @Input("prop2") prop: string;
}

describe("input decorator", function() {
    let instance: any;

    beforeEach(function() {
        instance = new Test();
    });

    test("should create bindings", function () {
        expect(instance.constructor.bindings).toBeDefined();
    });

    test("should add `prop` to bindings", function () {
        expect(instance.constructor.bindings.prop).toBeDefined();
    });

    test("should add `prop` to bindings as one-way", function () {
        expect(instance.constructor.bindings.prop[0]).toEqual("<");
    });

    test("should add `prop` to bindings with alias to `prop2`", function () {
        expect(instance.constructor.bindings.prop).toEqual("<prop2");
    });
});
