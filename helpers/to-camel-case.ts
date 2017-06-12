export default function toCamelCase(str: string) {
    let newStr = "";
    let newArr = [];

    if (str.indexOf("-") != -1) {
        newArr = str.split("-");
        for (var i = 1 ; i < newArr.length ; i++) {
            newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1);
        }
        newStr = newArr.join("");
    }

    return newStr;
}
