import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as p from 'phin'

@Injectable()
export class Crawler {

  async getDeparturesInfo(): Promise<string> {
    const res = await p('https://www.gibraltarairport.gi/content/live-flight-info')
    const $ = cheerio.load(res.body)

    return $.html()
  }

}
