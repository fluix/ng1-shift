import kebabCaseToCamelCase from "../../../helpers/kebab-case-to-camel-case";
import {DeclarationType} from "../../../models/declaration-type";
import {Metakeys} from "../../../models/metakeys";
import {removeBracketsAndDot} from "../../directive/helpers";
import {DirectiveFactory} from "../../directive/factory";

export default function daclarationHandler(ng1Module: any, declarations: any) {
    declarations.forEach((declaration: any) => {
        const hasNg1Meta = Reflect.hasMetadata(Metakeys.type, declaration);

        if (hasNg1Meta) {
            const declarationType = Reflect.getMetadata(Metakeys.type, declaration);
            const selectorNg2 = declaration.selector;
            let selectorNg1: string;

            switch (declarationType) {
                case DeclarationType.component:
                    selectorNg1 = kebabCaseToCamelCase(selectorNg2);

                    ng1Module.component(selectorNg1, declaration);
                    break;

                case DeclarationType.directive:
                    selectorNg1 = removeBracketsAndDot(selectorNg2);

                    ng1Module.directive(selectorNg1, DirectiveFactory(declaration));
                    break;
            }
        }
    });
}
