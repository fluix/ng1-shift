import toCamelCase from "../../../helpers/to-camel-case";

export default function daclarationHandler(ng1Module: any, declarations: any) {
    declarations.forEach((declaration: any) => {
        const selectorNg2 = declaration.selector;
        const selectorNg1 = toCamelCase(selectorNg2);

        ng1Module.component(selectorNg1, declaration);
    });
}
