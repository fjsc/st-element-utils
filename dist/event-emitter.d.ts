export interface EventOptions {
    /** should event bubble through the DOM */
    bubbles?: boolean;
    /** event is cancelable */
    cancelable?: boolean;
    /** can event bubble between the shadow DOM and the light DOM boundary */
    composed?: boolean;
}
export declare class EventEmitter<T> {
    private target;
    private eventName;
    constructor(target: HTMLElement, eventName: string);
    emit(value: T, options?: EventOptions): void;
}
export declare function event(): (protoOrDescriptor: any, name: string) => any;
//# sourceMappingURL=event-emitter.d.ts.map