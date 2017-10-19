export function DirectiveFactory(type: any) {
    return () => Object({
        ...type
    });
}
