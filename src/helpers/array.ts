export function findFirst<T>(array: Array<T>, expression: (value: T) => boolean): T | null {

    // @ts-ignore
    if (!angular.isFunction(expression)) {
        const first = array[0];
        if (!first) {
            return null;
        }
        return first;
    }
    for (let i = 0; i < array.length; i++) {
        if (expression(array[i])) {
            return array[i];
        }
    }
    return null;
}
