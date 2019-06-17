import {Test, TestingModule } from '@nestjs/testing';
import { Crawler } from '../../src/domain/service.crawler';
import { Departure } from 'dist/domain/model/departure';

describe('Crawler Service', () => {

  let svc;

  beforeAll(() => {
    svc = new Crawler()
  })

  it('Get table of departures for today', async () => {
    const departures: Array<Departure> = await svc.getDeparturesInfo()
    expect(departures).toBeTruthy();
    expect(departures.length).toBeGreaterThan(0);
  });

});
