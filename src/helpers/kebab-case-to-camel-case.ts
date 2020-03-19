export default function kebabCaseToCamelCase(str: string) {
    if (str.indexOf("-") !== -1) {
        const newArr = str.toLowerCase().split("-");

        // We are starting from 1 because the first letter in camelCase word is in lowercase
        for (let i = 1; i < newArr.length; i++) {
            newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1);
        }

        return newArr.join("");
    }

    return str;
}
