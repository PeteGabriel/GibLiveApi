export interface Cachable<String, T> {
  del(keys: String[]): boolean;
  get(key: String): T;
	set(key: String, obj: T, onRetrieve?: Function): boolean;
}
