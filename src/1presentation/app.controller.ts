import { Controller, Get, HttpCode, Header, Req, Res, Request, BadGatewayException, HttpStatus, NotFoundException } from '@nestjs/common';
import { AppService } from '../2domain/app.service';
import { Crawler } from '../2domain/service.crawler';
import { Departure } from '../2domain/model/departure';
import { DailyEvent } from '../2domain/model/daily_event';
import { Arrival } from '../2domain/model/arrival';
import { Collection, Data, Item, Link } from './collection';


@Controller('/')
export class AppController {

  static DEPARTURE: string = "departure"
  static ARRIVAL: string = "arrival"


  constructor(
    private readonly appService: AppService,
    private readonly cService: Crawler,
  ) {}
 
  @Get('/')
  @HttpCode(200)
  @Header('Content-Type', 'application/vnd.collection+json')
  async root(@Req() request: Request): Promise<string> {
    const root = {
      "collection" :
      {
        "version" : "1.0",
        "href" : "/",
        "links" : [
          {"href" : request.url + 'departures', "rel" : "departures", "render" : "link"},
          {"href" : request.url + 'arrivals', "rel" : "arrivals", "render" : "link"},
          {"href" : request.url + 'next-flight', "rel" : "next-flight", "render" : "link"}
        ]
      }
    }

    return JSON.stringify(root)
  }

  @Get('/departures')
  @HttpCode(200)
  @Header('Content-Type', 'application/vnd.collection+json')
  async departures(@Req() request: Request): Promise<string> {

    const root = {
      "collection" :
      {
        version : "1.0",
        href : request.url,
        links : [
          {"href" : '/arrivals', "rel" : "arrivals", "render" : "link"},
          {"href" : '/next-flight', "rel" : "next-flight", "render" : "link"}
        ],
        items: []
      }
    }

    try{
      const departures = await this.cService.getDeparturesInfo()
      departures.forEach(element => {
        root.collection.items.push(
          {
            data : [{ name: "departure", value: element }]
          }
        )
      })
      return JSON.stringify(root)
    }catch(e){
      throw new BadGatewayException()
    }
  }

  @Get('/arrivals')
  @HttpCode(200)
  @Header('Content-Type', 'application/vnd.collection+json')
  async arrivals(@Req() request: Request): Promise<string> {

    const root = {
      "collection" :
      {
        version : "1.0",
        href : request.url,
        links : [
          {"href" : '/departures', "rel" : "departures", "render" : "link"},
          {"href" : '/next-flight', "rel" : "next-flight", "render" : "link"}
        ],
        items: []
      }
    }

    try{
      const arrivals = await this.cService.getArrivalsInfo()
      arrivals.forEach(element => {
        root.collection.items.push(
          {
            data : [{ name: "arrival", value: element }]
          }
        )
      })
      return JSON.stringify(root)
    }catch(e){
      throw new BadGatewayException();
    }
  }

  @Get('alive')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  alive(): string {
    return this.appService.alive();
  }

  @Get('/next-flight')
  @HttpCode(200)
  @Header('Content-Type', 'application/vnd.collection+json')
  async next(@Req() request: Request): Promise<string> {   

    let departures: Array<DailyEvent<Departure>> = null
    let arrivals: Array<DailyEvent<Arrival>> = null
    
    try{
      departures = await this.cService.getDeparturesInfo();
      arrivals = await this.cService.getArrivalsInfo();
    }catch(e){
      throw new BadGatewayException();
    }

    const nF = await this.cService.getNextFlight(arrivals, departures)
    if (nF == null){
      throw new NotFoundException("No info was found for the next flight")
    }

    let getItemName = (flight) => flight.from != undefined ? AppController.ARRIVAL : AppController.DEPARTURE

    const root = buildSimpleCollection(request.url)
    root.addItem(new Item(new Data(getItemName(nF), nF)))
    
    return JSON.stringify({collection: root})
  }
}


/**
 * Build a response object for the next flight request.
 * 
 * @param hrefCollection Href parameter of collection response.
 * @param item Content for the data parameter. In this case the next flight.
 * @returns Object representing the next flight response.
 */
function buildSimpleCollection(hrefCollection: string): Collection {

  let collection: Collection
  collection = new Collection("1.0", hrefCollection)

  collection.addLink(new Link('/arrivals', 'arrivals', 'link'))
  collection.addLink(new Link('/departures', 'departures', 'link'))
 
  return collection
}