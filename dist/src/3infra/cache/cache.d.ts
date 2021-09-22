import { Cachable } from "./cachable";
export declare class Cache implements Cachable<string> {
    private cache;
    constructor();
    set(key: string, obj: string): Promise<string>;
    get(key: string): Promise<string>;
    del(keys: string[]): void;
}
