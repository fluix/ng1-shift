export class Ng1ShiftRouterModule {
    static $inject = [
        "$stateProvider"
    ];

    constructor($stateProvider: any) {
        $stateProvider
            .state("page1", {
                url: "/page1",
                template: "hello from page1"
            })

            .state("page2", {
                url: "/page2",
                template: "hello from page2"
            });
    }
}
