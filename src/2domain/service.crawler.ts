import { Injectable } from '@nestjs/common';
import { Departure } from './model/departure'
import { DailyDeparture } from './model/daily_departure';
import { WebGateway } from './../3infra/interfaces/web_gateway';
import WebGatewayImpl from './../3infra/impl/web_gateway_impl';
import { DailyEvent } from './model/daily_event';
import { Arrival } from './../2domain/model/arrival';

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

    const dailyEvts = new Array<DailyEvent<Arrival>>();
    const flightDates = await this.loadFlightDateHtmlInfo()

    let tables: any[] = await this.extractFlightsByDate(flightDates);
    this.extractDataFromNodes(tables);

    for (let index = 0; index < tables.length; index++) {
      const arrivals: Arrival[] = new Array<Arrival>()
      const date = flightDates[index]

      tables[index].table.forEach(data => {
        let newDep = new Arrival({
          extendedTime: date,
          time: data[0],
          code: data[1],
          operator: data[2],
          from: data[3],
          status: data[4]
        })
        arrivals.push(newDep)
      });

      dailyEvts.push(new DailyEvent({date: date, events: arrivals}))
    }

    return dailyEvts
  }

  async getDeparturesInfo(): Promise<Array<DailyEvent<Departure>>> {
    await this.gate.setup()
    const flightDates = await this.loadFlightDateHtmlInfo()

    let tables: any[] = await this.extractFlightsByDate(flightDates);
    this.extractDataFromNodes(tables);

    let dailyDepartures: DailyEvent<Departure>[] = new Array<DailyEvent<Departure>>()

    for (let index = 0; index < tables.length; index++) {
      const departures: Departure[] = new Array<Departure>()
      const date = flightDates[index]

      tables[index].table.forEach(data => {
        let newDep = new Departure({
          extendedTime: date,
          time: data[0],
          code: data[1],
          operator: data[2],
          to: data[3],
          status: data[4]
        })
        departures.push(newDep)
      });

      dailyDepartures.push(new DailyEvent({date, events:departures}))
    }

    return dailyDepartures
  }

  private extractDataFromNodes(tables: any[]) {
    tables.forEach((elem) => {
      elem.table = elem.table.children.map((i, e) => {
        if (i.name == 'tr') {
          return i.childNodes.map(n => {
            if (n.name == 'td') {
              if (n.childNodes[0].name == 'img') {
                const parts = n.childNodes[0].attribs['src'].split('/');
                const airplaneCia = parts[parts.length - 1].split('_')[0];
                return airplaneCia;
              }
              else
                return n.childNodes[0].data;
            }
          })
            .filter((e) => e != undefined);
        }
        return undefined;
      }).filter((e) => e != undefined);
    });
  }

  private async extractFlightsByDate(flightDates: Cheerio) {
    let allTheDepData = await this.gate.load('.tab-arrivals div');
    allTheDepData = allTheDepData.find(await this.gate.load('tbody'));
    let tables: any[] = [];
    allTheDepData.each((i, n) => tables.push({ date: flightDates[i], table: n }));
    return tables;
  }
}
