import {Test, TestingModule } from '@nestjs/testing';
import { Crawler } from '../../src/domain/service.crawler';
import { Departure } from 'dist/domain/model/departure';
import { DailyDeparture } from 'src/domain/model/daily_departure';

describe('Crawler Service', () => {

  let svc;

  beforeAll(() => {
    svc = new Crawler()
  })

  it('Get table of departures for today', async () => {
    const departures: Array<DailyDeparture> = await svc.getDeparturesInfo()
    expect(departures.length).toBeGreaterThan(0);
    const example = departures[0];
    expect(example.date).toBeDefined();
    expect(example.departures.length).toBeGreaterThan(0);
  });

});
