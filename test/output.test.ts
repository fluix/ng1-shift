import {EventEmitter, Output} from "../index";

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

    test("should add `onCallback` to bindings with prefix `__`", function () {
        expect(instance.constructor.bindings.__onCallback).toBeDefined();
    });

    test("should add `onCallback` to bindings as callback", function () {
        expect(instance.constructor.bindings.__onCallback[0]).toEqual("&");
    });

    test("should add `onCallback` to bindings with alias to `onAliasCallback`", function () {
        expect(instance.constructor.bindings.__onCallback).toEqual("&onAliasCallback");
    });

    test("should subscribe to EventEmitter `__onCallback`", function () {
        instance.onCallback = new EventEmitter();
        expect(instance.onCallback.listeners.length).toEqual(1);
    });

    test("should call callback when emit EventEmitter", function () {
        const callback = jest.fn();

        instance.__onCallback = callback;
        instance.onCallback = new EventEmitter();
        instance.onCallback.emit();

        expect(callback).toHaveBeenCalled();
    });
});
