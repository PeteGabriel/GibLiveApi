import {Test, TestingModule } from '@nestjs/testing';
import { Crawler } from '../../src/domain/service.crawler';

describe('Crawler Service', () => {

  let svc;

  beforeAll(() => {
    svc = new Crawler()
  })

  it('Get table of departures for today', () => {
    const departures = svc.getDeparturesInfo()
    expect(departures).toBe('departures info');
  });

});
