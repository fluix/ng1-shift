export default function providerHandler(ng1Module: any, providers: any, declarations: any) {

    if (declarations) {
        declarations.forEach((declaration: any) => {
            const injections = Reflect.getMetadata("design:paramtypes", declaration);

            if (injections) {
                const injectedServices = injections.map(({ ng1ServiceName }: any) => ng1ServiceName);

                if (!declaration.$inject) {
                    declaration.$inject = [];
                }

                injectedServices.forEach((injection: string, index: number) => {
                    if (injection[0] === "$") {
                        declaration.$inject[index] = injection;
                    }
                });

                providers.forEach((provider: any) => {
                    const serviceToken = provider.ng1ServiceName;
                    const injectIndex = injectedServices.indexOf(serviceToken);

                    declaration.$inject[injectIndex] = serviceToken;
                    ng1Module.service(serviceToken, provider);
                });
            }
        });
    } else {
        providers.forEach((provider: any) => {
            const serviceToken = provider.ng1ServiceName;

            ng1Module.service(serviceToken, provider);
        });
    }
}
