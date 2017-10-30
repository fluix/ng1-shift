import {Inject} from "../index";

class Test {
    constructor(
        @Inject("service") service: Function,
        @Inject("service2") service2: Function
    ) {}
}

describe("Inject decorator", function() {
    let instance: any;

    beforeEach(function() {
        instance = new Test(() => {}, () => {});
    });

    test("should create $inject", function () {
        expect(instance.constructor.$inject).toBeDefined();
    });

    test("should add `service` to $inject", function () {
        expect(instance.constructor.$inject).toContain("service");
    });

    test("should add `service` to the first place in $inject", function () {
        expect(instance.constructor.$inject[0]).toEqual("service");
    });

    test("should add `service2` to the second place in $inject", function () {
        expect(instance.constructor.$inject[1]).toEqual("service2");
    });
});
