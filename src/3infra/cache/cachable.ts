export interface Cachable<T> {
  del(keys: string[]): void;
  get(key: string): Promise<T>;
  set(key: string, obj: any, onRetrieve?: Function): Promise<T>;
}