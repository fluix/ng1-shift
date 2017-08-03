import kebabCaseToCamelCase from "../../../helpers/kebab-case-to-camel-case";

export default function daclarationHandler(ng1Module: any, declarations: any) {
    declarations.forEach((declaration: any) => {
        const selectorNg2 = declaration.selector;
        const selectorNg1 = kebabCaseToCamelCase(selectorNg2);

        ng1Module.component(selectorNg1, declaration);
    });
}
