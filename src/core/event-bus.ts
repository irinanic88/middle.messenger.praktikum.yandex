import {EventBusCallbackType} from "./types";

class EventBus {
  private listeners: Record<string, EventBusCallbackType[]>
  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: EventBusCallbackType): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: EventBusCallbackType): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
    );
  }

  public emit(event: string, args = []): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function(listener) {
      listener(...args);
    });
  }
}

export default EventBus;
