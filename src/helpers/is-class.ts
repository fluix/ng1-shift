// Solution from: https://stackoverflow.com/questions/30758961/how-to-check-if-a-variable-is-an-es6-class-declaration#answer-68708710
export function isClass(value: any) {
    return typeof value === "function" && (
        /^\s*class[^\w]+/.test(value.toString()) ||

        // 1. native classes don't have `class` in their name
        // 2. However, they are globals and start with a capital letter.
        (window[value.name] === value && /^[A-Z]/.test(value.name))
    );
}
