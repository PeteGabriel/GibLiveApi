import { Injectable } from '@nestjs/common';
import { Departure } from './model/departure'
import { WebGateway } from './../3infra/interfaces/web_gateway';
import WebGatewayImpl from './../3infra/impl/web_gateway_impl';
import { DailyEvent } from './model/daily_event';
import { Arrival } from './../2domain/model/arrival';
import { EventComparator } from './impl/event_comparator';
import { Event } from './model/event';

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
    try{
      await this.gate.setup()
    }catch(e){
      throw e
    }

    const dailyEvts = new Array<DailyEvent<Arrival>>();
    const flightDates = await this.loadFlightDateHtmlInfo()

    let tables: any[] = await this.getArrivalsByDate(flightDates);
    this.extractDataFromNodes(tables);

    for (let index = 0; index < tables.length; index++) {
      const arrivals: Arrival[] = new Array<Arrival>()
      const date = flightDates[index] //human readable date

      tables[index].table.forEach(data => {
        let newDep = new Arrival({
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
    try{
      await this.gate.setup()
    }catch(e){
      throw e
    }

    const flightDates = await this.loadFlightDateHtmlInfo()
    let tables: any[] = await this.getDeparturesByDate(flightDates);
    this.extractDataFromNodes(tables);

    let dailyDepartures: DailyEvent<Departure>[] = new Array<DailyEvent<Departure>>()

    for (let index = 0; index < tables.length; index++) {
      const departures: Departure[] = new Array<Departure>()
      const date = flightDates[index] //human readable date

      tables[index].table.forEach(data => {
        let newDep = new Departure({
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


  /**
   * Return info about the next flight (departure or arrival).
   * The next flight is obtained based on the time of the event.
   * 
   * If today's flights have already departed or arrived, this method returns the 
   * next arrival or departure (whichever is the earliest to happen).
   */
  async getNextFlight(arrivals: Array<DailyEvent<Arrival>>, 
    departures: Array<DailyEvent<Departure>>): Promise<Event> {

      if (departures.length == 0 && arrivals.length == 0){
        return null
      }

      const arrivalsKeyword = "arrived"
      const departuresKeyword = "on time"
      
      for(let i=0; i <= (departures.length-1); i++){
        let dailyArival = arrivals[i]
        let dailyDepartures = departures[i]

        for(let j=0; j<= (dailyDepartures.events.length-1); j++){
          let arrivalEvent = dailyArival.events[j]
          let departuresEvent = dailyDepartures.events[j]

          let comp = new EventComparator();
          let res = comp.compare(arrivalEvent, departuresEvent)
          if (res <= 0){
            let arrivalStatus = arrivalEvent.status.toLowerCase()
            if (arrivalStatus.startsWith(arrivalsKeyword)){
              continue
            }else return arrivalEvent
          }else {
            let departureStatus = departuresEvent.status.toLowerCase()
            if (departureStatus.startsWith(departuresKeyword)){
              continue
            }else return departuresEvent
          }
        }
      }
      return null
    }



  private extractDataFromNodes(tables: any[]) {
    tables.forEach((elem) => {
      elem.table = elem.table.children.map((i, e) => {
        if (i.name == 'tr') {
          return i.childNodes.map(n => {
            if (n.name == 'td') {
              if (n.childNodes[0].name == 'img') {
                return this.extractAirplaneCia(n);
              }
              else{
                return n.childNodes[0].data;
              }
            }
          })
          .filter((e) => e != undefined);
        }
        return undefined;
      }).filter((e: any) => e != undefined);
    });
  }

  /**
   * Based on the info we extract the company name
   * responsable for this given flight.
   */
  private extractAirplaneCia(n: any) {
    const parts = n.childNodes[0].attribs['src'].split('/');
    const airplaneCia = parts[parts.length - 1].split('_')[0];
    return airplaneCia;
  }


  private async getArrivalsByDate(flightDates: Cheerio) {
    let allTheDepData = await this.gate.load('.tab-arrivals div');
    allTheDepData = allTheDepData.find(await this.gate.load('tbody'));
    let tables: any[] = [];
    allTheDepData.each((i, n) => tables.push(new FlightTable(flightDates[i], n )));
    return tables;
  }

  private async getDeparturesByDate(flightDates: Cheerio) {
    let allTheDepData = await this.gate.load('.tab-departures div');
    allTheDepData = allTheDepData.find(await this.gate.load('tbody'));
    let tables: any[] = [];
    allTheDepData.each((i, n) => tables.push(new FlightTable(flightDates[i], n )));
    return tables;
  }

}

class FlightTable {

  date: CheerioElement;
  table: any;

  constructor(date: CheerioElement,  table: any){
    this.date = date;
    this.table = table;
  }
} 
