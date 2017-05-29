import {Inject} from "../index";

class Test {
    constructor(@Inject("service") service: Function) {};
}

describe("Inject decorator", function() {
    let instance;

    beforeEach(function() {
        instance = new Test(() => {});
    });

    test("should create $inject", function () {
        expect(instance.constructor.$inject).toBeDefined();
    });

    test("should add `service` to $inject", function () {
        expect(instance.constructor.$inject).toContain("service");
    });
});
