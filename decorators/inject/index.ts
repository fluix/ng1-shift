export function Inject(dependencyName: string): ParameterDecorator {
    return function (target: any, property: string | symbol, parameterIndex: number) {
        if (!target.$inject) {
            target.$inject = [];
        }

        target.$inject[parameterIndex] = dependencyName;
    };
}
