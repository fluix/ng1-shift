let store = {} as any;

export default function counter(entity: string) {
    const registeredEntity = entity in store;

    if (!registeredEntity) {
        store[entity] = 0;
    }

    return store[entity]++;
}
