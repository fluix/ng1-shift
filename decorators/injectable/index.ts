export function Injectable() {
    return function (target: any) {
        const injections = Reflect.getMetadata("design:paramtypes", target);

        if (injections) {
            if (!target.$inject) {
                target.$inject = [];
            }

            injections.forEach(({ name }: any) => target.$inject.push(name));
        }
    };
}
