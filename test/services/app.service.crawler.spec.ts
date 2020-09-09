import { Crawler } from '../../src/2domain/service.crawler';
import { DailyEvent } from './../../src/2domain/model/daily_event';
import { Arrival } from './../../src/2domain/model/arrival';
import WebGatewayImpl from './../../src/3infra/impl/web_gateway_impl';
import {Cache} from './../../src/3infra/cache/cache'
import { Departure } from '../../src/2domain/model/departure';

describe('Crawler Service', () => {

  let svc;

  beforeAll(() => {
    svc = new Crawler(new WebGatewayImpl(new Cache()))
  })

  it('Get table of departures for today', async () => {
    const departures:  Array<DailyEvent<Departure>> = await svc.getDeparturesInfo()
    expect(departures.length).toBeGreaterThan(0);
    const example: DailyEvent<Departure> = departures[0];
    expect(example.date).toBeDefined();
    expect(example.events.length).toBeGreaterThan(0);

    const todaysTime = new Date().toISOString().slice(0, 10)
    example.events.forEach(event => {
      expect(event.code).toBeDefined()
      expect(event.operator).toBeDefined()
      expect(event.status).toBeDefined()
      expect(event.time).toBeDefined()
      expect(event.to).toBeDefined()
      expect(event.time.startsWith(todaysTime)).toBeTruthy()
    });
  });

  it('Get table of arrivals for today', async () => {
    const arrivals: Array<DailyEvent<Arrival>> = await svc.getArrivalsInfo()
    expect(arrivals.length).toBeGreaterThan(0);
    const example = arrivals[0];
    expect(example.date).toBeDefined();
    expect(example.events.length).toBeGreaterThan(0);

    const todaysTime = new Date().toISOString().slice(0, 10)
    example.events.forEach(event => {
      expect(event.time.startsWith(todaysTime)).toBeTruthy()
    });
  });

});
