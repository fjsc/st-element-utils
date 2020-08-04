export class EventEmitter {
    constructor(target, eventName) {
        this.target = target;
        this.eventName = eventName;
    }
    emit(value, options) {
        this.target.dispatchEvent(new CustomEvent(this.eventName, { detail: value, ...options }));
    }
}
export function event() {
    return (protoOrDescriptor, name) => {
        const descriptor = {
            get() {
                return new EventEmitter(this, name !== undefined ? name : protoOrDescriptor.key);
            },
            enumerable: true,
            configurable: true,
        };
        if (name !== undefined) {
            // legacy TS decorator
            return Object.defineProperty(protoOrDescriptor, name, descriptor);
        }
        else {
            // TC39 Decorators proposal
            return {
                kind: 'method',
                placement: 'prototype',
                key: protoOrDescriptor.key,
                descriptor,
            };
        }
    };
}
//# sourceMappingURL=event-emitter.js.map