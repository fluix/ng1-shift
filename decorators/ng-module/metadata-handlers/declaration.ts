import kebabCaseToCamelCase from "../../../helpers/kebab-case-to-camel-case";

export default function daclarationHandler(ng1Module: any, declarations: any) {
    declarations.forEach((declaration: any) => {
        const selectorNg2 = declaration.selector;
        let selectorNg1 = kebabCaseToCamelCase(selectorNg2);

        if (declaration.isDirective) {
            selectorNg1 = selectorNg1.replace("[", "").replace("]", "");

            const componentInstance = () => {
                let directive = ($compile: any, $timeout: any, $document: any) => {
                    return {
                        restrict: "A",
                        replace: false,
                        link: (
                            scope: any,
                            element: any,
                            attrs: any
                        ) =>
                            new declaration(scope, element, attrs, $compile, $timeout, $document)
                    };
                };
                directive.$inject = ["$compile", "$timeout", "$document"];

                return directive;
            }

            return ng1Module.directive(selectorNg1, componentInstance());
        }

        ng1Module.component(selectorNg1, declaration);
    });
}
