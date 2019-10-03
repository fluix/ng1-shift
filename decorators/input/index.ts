import {IComponentClass} from "../component/interfaces";
import {ComponentMetadataService} from "../component/metadata.service";

export function Input(alias?: string): PropertyDecorator {
    return function (target: IComponentClass, property: string) {
        const componentMetadata = new ComponentMetadataService(target.constructor);

        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }

        const attrBinding = alias ? alias : property;

        target.constructor.bindings[property] = "<" + attrBinding;
        componentMetadata.addInput(property, attrBinding);
    };
}
