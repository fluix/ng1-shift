import {ComponentMetadataService} from "../component/metadata.service";

export function Input(alias?: string): PropertyDecorator {
    return function (target: any, property: string | symbol) {
        const componentMetadata = new ComponentMetadataService(target.constructor);

        if (!target.constructor.bindings) {
            target.constructor.bindings = {};
        }
        const propName = String(property);
        const attrBinding = alias ? alias : propName;

        target.constructor.bindings[propName] = "<" + attrBinding;
        componentMetadata.addInput(propName, attrBinding);
    };
}
