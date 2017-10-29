const entityCounters: Record<string, number> = {};

export default function counter(entity: string) {
    const registeredEntity = entity in entityCounters;

    if (!registeredEntity) {
        entityCounters[entity] = 0;
    }

    return entityCounters[entity]++;
}
