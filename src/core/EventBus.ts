import { EventBusCallback } from '../types/common.types';

class EventBus<Events extends Record<string, unknown[]>> {
  private listeners: {
    [K in keyof Events]?: EventBusCallback<Events[K]>[]
  } = {};

  public on<K extends keyof Events>(event: K, callback: EventBusCallback<Events[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  public off<K extends keyof Events>(event: K, callback: EventBusCallback<Events[K]>): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback
    );
  }

  public emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    if (!this.listeners[event]) return;
    this.listeners[event]!.forEach((listener) => listener(...args));
  }
}

export default EventBus;
