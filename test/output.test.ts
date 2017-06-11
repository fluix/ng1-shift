import {EventEmitter, Output} from "../index";

class TestWithOneOutput {
    @Output("onAliasCallback") onCallback: Function;
}

class TestWithManyOutputs {
    @Output("cb1") callback1: Function;
    @Output("cb2") callback2: Function;
}

describe("Output decorator", function() {
    let testOneOutput: any,
        testManyOutputs: any;

    beforeEach(function() {
        testOneOutput = new TestWithOneOutput();
        testManyOutputs = new TestWithManyOutputs();
    });

    test("should create bindings", function () {
        expect(Object.keys(testOneOutput.constructor.bindings).length).toBe(1);
        expect(Object.keys(testManyOutputs.constructor.bindings).length).toBe(2);
    });

    test("should add `onCallback` to bindings with prefix `__`", function () {
        expect(testOneOutput.constructor.bindings.__onCallback).toBeDefined();
        expect(testManyOutputs.constructor.bindings.__callback1).toBeDefined();
        expect(testManyOutputs.constructor.bindings.__callback2).toBeDefined();
    });

    test("should add `onCallback` to bindings as callback", function () {
        expect(testOneOutput.constructor.bindings.__onCallback[0]).toEqual("&");
    });

    test("should add `onCallback` to bindings with alias to `onAliasCallback`", function () {
        expect(testOneOutput.constructor.bindings.__onCallback).toEqual("&onAliasCallback");
    });

    test("should subscribe to EventEmitter `__onCallback`", function () {
        testOneOutput.onCallback = new EventEmitter();
        expect(testOneOutput.onCallback.listeners.length).toEqual(1);
    });

    test("should call callback when emit EventEmitter", function () {
        const callback = jest.fn();

        testOneOutput.__onCallback = callback;
        testOneOutput.onCallback = new EventEmitter();
        testOneOutput.onCallback.emit();

        expect(callback).toHaveBeenCalled();
    });
});
