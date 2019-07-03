import { Injectable } from '@nestjs/common';
import { Departure } from './model/departure'
import { DailyDeparture } from './model/daily_departure';
import { WebGateway } from './../3infra/interfaces/web_gateway';
import WebGatewayImpl from './../3infra/impl/web_gateway_impl';
import { DailyEvent } from './model/daily_event';
import { Arrival } from 'dist/domain/model/arrival';

@Injectable()
export class Crawler {

  private readonly gate: WebGateway

  constructor(private readonly g: WebGatewayImpl){
    this.gate = g
  }

  private async loadFlightDateHtmlInfo(): Promise<Cheerio> {
    const info = await this.gate.load('.flight-info-tables')
    return info.find('.pt').map((_, t) => t.children[0].data)
  }

  async getArrivalsInfo(): Promise<Array<DailyEvent<Arrival>>> {
    await this.gate.setup()

    const dailyEvts = new Array<DailyEvent<Arrival>>()
    dailyEvts[0] = new DailyEvent({date: new Date().toISOString(), events: []})
    return dailyEvts
  }

  async getDeparturesInfo(): Promise<Array<DailyDeparture>> {
    await this.gate.setup()
    const flightDates = await this.loadFlightDateHtmlInfo()

    let allTheDepData = await this.gate.load('.tab-departures div')
    allTheDepData = allTheDepData.find(await this.gate.load('tbody > tr > td'))
                  .map((i,e) => e.children[0])
                  .map((i, e) => {
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
