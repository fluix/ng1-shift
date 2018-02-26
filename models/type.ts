export default interface Type extends Function {
    new (...args: any[]): any;
}
