import * as cheerio from 'cheerio';
import * as p from 'phin'
import { Injectable } from '@nestjs/common';
import { Cachable } from '../cache/cachable';
import { Cache } from '../cache/cache';
import { WebGateway } from './../interfaces/web_gateway';

@Injectable()
export default class WebGatewayImpl implements WebGateway{
  private $: CheerioStatic
  private cache: Cachable<string>

  constructor(private readonly c: Cache) {
    this.cache = c
  }

  async setup(): Promise<void> {
    const key = 'live_flight_info'
    await this.cache.get(key).
      then(async cached => {
        await p(
          {
            'url': 'https://www.gibraltarairport.gi/content/live-flight-info',
            'core': {
              timeout: 2000
            }
          })
          .then(res => this.$ = cheerio.load(res.body))
          .catch(err => {
            if (err)
              throw new Error("could not connect to Gib airport gateway")
          })
      })
  }

  load(classId: string): Promise<Cheerio>{
    const key = 'live_flight_key'
    return new Promise(async (resolve, reject) => {

      await this.cache.get(key)
        .catch(err => {
          if (err)
            reject(err)
        })
        .then(res => {
          resolve(this.$(classId))
      })
    })
  }

}