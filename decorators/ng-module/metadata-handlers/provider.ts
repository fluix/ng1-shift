export default function providerHandler(ng1Module: any, providers: any, declarations: any) {
    declarations.forEach((declaration: any) => {
        debugger
        const injections = Reflect.getMetadata("design:paramtypes", declaration);

        if (injections) {
            const injectedServices = injections.map(({ name }: any) => name);

            if (!declaration.$inject) {
                declaration.$inject = [];
            }

            providers.forEach((provider: any) => {
                const serviceToken = provider.name;
                const injectIndex = injectedServices.indexOf(serviceToken);

                declaration.$inject[injectIndex] = serviceToken;
                ng1Module.service(serviceToken, provider);
            });
        }
    });
}
