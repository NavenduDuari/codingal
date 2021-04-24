export interface Action<T> {
  type: T;
  payload?: Record<string, any>;
}
