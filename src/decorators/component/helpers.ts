import {ComponentMetadataService} from "./metadata.service";
import {IComponentClass} from "./interfaces";

export function replaceTwoWayBindings(target: IComponentClass) {
    const componentMetadata = new ComponentMetadataService(target),
        inputs = componentMetadata.getInputs(),
        outputs = componentMetadata.getOutputs();

    if (inputs.length > 0 && outputs.length > 0) {
        inputs.forEach(input => {
            const requiredOutput = `${input.inputName}Change`;
            const hasOutput = outputs.some(output => output.outputName === requiredOutput);

            if (hasOutput && target.bindings) {
                target.bindings[input.componentProp] = target.bindings[input.componentProp].replace(/^</, "=");
            }
        });
    }
}
