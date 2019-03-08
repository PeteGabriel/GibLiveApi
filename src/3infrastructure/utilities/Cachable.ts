export interface Cachable<String, T> {
  del(keys: string[]): boolean;
  get(key: string): T;
	set(key: string, obj: T, onRetrieve?: Function): boolean;
}
