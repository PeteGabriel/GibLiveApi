import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as p from 'phin'
import { Departure } from './../domain/model/departure'
import { DailyDeparture } from './model/daily_departure';

@Injectable()
export class Crawler {

  async getDeparturesInfo(): Promise<Array<DailyDeparture>> {
    let tmp = null
    const res = await p('https://www.gibraltarairport.gi/content/live-flight-info')
    const $ = cheerio.load(res.body)

    const flightDates = $('.flight-info-tables').find('.pt').map((i, t) => t.children[0].data)

    let allTheDepData = $('.tab-departures div').find($('tbody > tr > td')).map((i,e) => e.children[0])
    allTheDepData = allTheDepData.map((i, e) => {
      if (!e.name)
        return e.data
      const parts = e.attribs['src'].split('/')
      const airplaneCia = parts[parts.length-1].split('_')[0]
      return airplaneCia
    })

    let dailyDepartures: DailyDeparture[] = new Array<DailyDeparture>()

    for (let index = 0; index < flightDates.length; index++) {
      const departures: Departure[] = new Array<Departure>()
      const date = flightDates[index]
      for(let i = 0; i < allTheDepData.length; i+=6){
        let newDep = new Departure({
          time: allTheDepData[i],
          code: allTheDepData[i+1],
          operator: allTheDepData[i+2],
          to: allTheDepData[i+3],
          status: allTheDepData[i+4]
        })
        departures.push(newDep)

      }
      dailyDepartures.push(new DailyDeparture({date, departures}))
    }

    return dailyDepartures
  }

}
