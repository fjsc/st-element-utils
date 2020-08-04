export interface EventOptions {
  /** should event bubble through the DOM */
  bubbles?: boolean;
  /** event is cancelable */
  cancelable?: boolean;
  /** can event bubble between the shadow DOM and the light DOM boundary */
  composed?: boolean;
}

export class EventEmitter<T> {
  constructor(private target: HTMLElement, private eventName: string) { }

  emit(value: T, options?: EventOptions) {
    this.target.dispatchEvent(
      new CustomEvent<T>(this.eventName, { detail: value, ...options })
    );
  }
}

export function event() {
  return (protoOrDescriptor: any, name: string): any => {
    const descriptor = {
      get(this: HTMLElement) {
        return new EventEmitter(this, name !== undefined ? name : protoOrDescriptor.key);
      },
      enumerable: true,
      configurable: true,
    };

    if (name !== undefined) {
      // legacy TS decorator
      return Object.defineProperty(protoOrDescriptor, name, descriptor);
    } else {
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
