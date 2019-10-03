export class EventEmitter<T extends any = any> {
    private listeners: Array<(arg: T) => void> = [];

    emit(event: T | null = null) {
        this.listeners.forEach(callback => callback.call(null, event));
    }

    subscribe(callback: (arg: T) => void) {
        this.listeners.push(callback);
    }
}
