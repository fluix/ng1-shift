export class EventEmitter<T extends any = any> {
    private listeners: Array<(event: T) => void> = [];

    emit(event?: T) {
        this.listeners.forEach(callback => callback.call(null, event));
    }

    subscribe(callback: (event: T) => void) {
        this.listeners.push(callback);
    }
}
