import counter from "../../helpers/counter";

export function Injectable() {
    return function (target: any) {
        const injections = Reflect.getMetadata("design:paramtypes", target);

        target.ng1ServiceName = `${target.name}-${counter("serviceName")}`;

        if (injections) {
            if (!target.$inject) {
                target.$inject = [];
            }

            injections.forEach(({ ng1ServiceName }: any) => target.$inject.push(ng1ServiceName));
        }
    };
}