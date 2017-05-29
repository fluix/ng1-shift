import {Output} from "../index";

class Test {
    @Output("onAliasCallback") onCallback: Function;
}

describe("Output decorator", function() {
    let instance;

    beforeEach(function() {
        instance = new Test();
    });

    test("should create bindings", function () {
        expect(instance.constructor.bindings).toBeDefined();
    });

    test("should add `onCallback` to bindings", function () {
        expect(instance.constructor.bindings.onCallback).toBeDefined();
    });

    test("should add `onCallback` to bindings as callback", function () {
        expect(instance.constructor.bindings.onCallback[0]).toEqual("&");
    });

    test("should add `onCallback` to bindings with alias to `onAliasCallback`", function () {
        expect(instance.constructor.bindings.onCallback).toEqual("&onAliasCallback");
    });
});
