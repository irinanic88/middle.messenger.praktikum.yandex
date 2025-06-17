export type EventBusCallbackType = (...args: any[]) => void;

export interface EventBusType {
  on(event: string, callback: EventBusCallbackType): void;
  off(event: string, callback: EventBusCallbackType): void;
  emit(event: string, args?: [] | any[]): void;
}
