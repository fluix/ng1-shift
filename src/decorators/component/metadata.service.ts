import {Metakeys} from "../../models/metakeys";
import {IComponentClass} from "./interfaces";

interface Input {
    componentProp: string;
    inputName: string;
}

interface Output {
    componentProp: string;
    outputName: string;
}

interface ComponentMetadata {
    inputs: Array<Input>;
    outputs: Array<Output>;
}

export class ComponentMetadataService {
    constructor(private target: IComponentClass) {}

    addInput(componentProp: string, inputName: string) {
        const options = this.metadata;

        options.inputs.push({componentProp, inputName});

        this.metadata = options;
    }

    addOutput(componentProp: string, outputName: string) {
        const options = this.metadata;

        options.outputs.push({componentProp, outputName});

        this.metadata = options;
    }

    getInputs(): Array<Input> {
        return this.metadata.inputs;
    }

    getOutputs(): Array<Output> {
        return this.metadata.outputs;
    }

    private get hasMetadata(): boolean {
        return Reflect.hasMetadata(Metakeys.componentOptions, this.target);
    }

    private get metadata(): ComponentMetadata {
        if (this.hasMetadata) {
            return Reflect.getMetadata(Metakeys.componentOptions, this.target);
        }

        return {
            inputs: [],
            outputs: []
        };
    }

    private set metadata(value: ComponentMetadata) {
        Reflect.defineMetadata(Metakeys.componentOptions, value, this.target);
    }
}
