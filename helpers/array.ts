export function findFirst<T>(array: Array<T>, expression: (value: T) => boolean): T {
    if (!angular.isFunction(expression)) {
        let first = array[0];
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
