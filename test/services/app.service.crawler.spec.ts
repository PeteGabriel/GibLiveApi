import { Crawler } from '../../src/2domain/service.crawler';
import { DailyDeparture } from './../../src/2domain/model/daily_departure';
import WebGatewayImpl from './../../src/3infra/impl/web_gateway_impl';
import {Cache} from './../../src/3infra/cache/cache'

describe('Crawler Service', () => {

  let svc;

  beforeAll(() => {
    svc = new Crawler(new WebGatewayImpl(new Cache()))
  })

  it('Get table of departures for today', async () => {
    const departures: Array<DailyDeparture> = await svc.getDeparturesInfo()
    expect(departures.length).toBeGreaterThan(0);
    const example = departures[0];
    expect(example.date).toBeDefined();
    expect(example.departures.length).toBeGreaterThan(0);
  });

});
