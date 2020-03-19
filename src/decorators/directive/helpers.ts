type RestrictString = "A" | "E" | "C";

export function removeBracketsAndDot(str: string): string {
    return str
        .replace(/^\[|\]$/ig, "")
        .replace(/^\./i, "");
}

export function getRestrictFromSelector(selector: string): RestrictString {
    const firstSign = selector.substr(0, 1);
    let restrict: RestrictString = "E";

    switch (firstSign) {
        case "[":
            restrict = "A";
            break;

        case ".":
            restrict = "C";
            break;
    }

    return restrict;
}
