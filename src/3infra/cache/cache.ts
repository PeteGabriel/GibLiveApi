import NodeCache = require("node-cache-promise");
import { Cachable } from "./Cachable";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Cache implements Cachable<string> {

  private cache: NodeCache;

  // one hour of ttl
  constructor() {
    this.cache = new NodeCache({ stdTTL: 60 * 60 * 1 });
  }

  set(key: string, obj: string): Promise<string> {
    return this.cache.set(key, obj);
  }

  get(key: string): Promise<string> {
    return this.cache.get(key)
  }

  del(keys: string[]) {
    this.cache.del(keys);
  }
}