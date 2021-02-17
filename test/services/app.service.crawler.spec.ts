import { Crawler } from '../../src/2domain/service.crawler';
import { DailyEvent } from './../../src/2domain/model/daily_event';
import { Arrival } from './../../src/2domain/model/arrival';
import WebGatewayImpl from './../../src/3infra/impl/web_gateway_impl';
import {Cache} from './../../src/3infra/cache/cache'
import { Departure } from '../../src/2domain/model/departure';
import { Event } from '../../src/2domain/model/event';

describe('Crawler Service', () => {

  let svc: Crawler;

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

  describe('Getting info about next flight', () => {

    it("should not display flights that already arrived/departed", async () => {
      const nextFlight: Event = await svc.getNextFlight(arrived, departed)
      expect(nextFlight).toBe(null)
    })

    it("should decide between flights scheduled for today if possible", async () => {
      const nextFlight: Event = await svc.getNextFlight(arrivals, departures)
      const expectedFlight = new Arrival({
        code: "EZY8901",
        operator: "EasyJet",
        time: "2021-02-17T11:11:50.799Z",
        status: "Scheduled ",
        from: "London Gatwick"
      })
      
      expect(nextFlight.code).toBe(expectedFlight.code)
      expect(nextFlight.operator).toBe(expectedFlight.operator)
      expect(nextFlight.time).toBe(expectedFlight.time)
      expect(nextFlight.status).toBe(expectedFlight.status)
      expect(nextFlight.from).toBe(expectedFlight.from)
      
    })

    it("should decide between flights scheduled for tomorrow if today's flights have already arrived/departed", async () => {
      const nextFlight: Event = await svc.getNextFlight(arrivals, departures)
      const expectedFlight = new Arrival({
        code: "EZY6299",
        operator: "EasyJet",
        time: "2020-09-11T10:10:16.828Z",
        status: "Scheduled ",
        from: "Bristol"
      })
      
      expect(nextFlight.code).toBe(expectedFlight.code)
      expect(nextFlight.operator).toBe(expectedFlight.operator)
      expect(nextFlight.time).toBe(expectedFlight.time)
      expect(nextFlight.status).toBe(expectedFlight.status)
      expect(nextFlight.from).toBe(expectedFlight.from)

    })

  })
});

const departed: Array<DailyEvent<Departure>> = [
  {
    date: "Thursday 10th of September 2020",
    events: [
      new Departure({
        code: "EZY1964",
        operator: "EasyJet",
        time: "2020-09-09T11:11:08.978Z",
        status: "Departed 10:50",
        to: "Manchester"
      }),
      new Departure({
        code: "EZY8902",
        operator: "EasyJet",
        time: "2020-09-09T11:11:08.978Z",
        status: "Departed 11:35",
        to: "London Gatwick"
      }),
      new Departure({
        code: "BA493",
        operator: "BA",
        time: "2020-09-09T11:11:08.978Z",
        status: "Departed 11:50",
        to: "London Heathrow"
      })
    ]
  }
] 

const arrived: Array<DailyEvent<Arrival>> = [
  {
    date: "Thursday 10th of September 2020",
    events: [
      new Arrival({
        code: "EZY6300",
        operator: "EasyJet",
        time: "2020-09-09T11:11:08.978Z",
        status: "Arrived 11:11",
        to: "Bristol"
      }),
      new Arrival({
        code: "EZY8902",
        operator: "EasyJet",
        time: "2020-09-09T11:11:08.978Z",
        status: "Arrived 11:11",
        to: "London Gatwick"
      }),
      new Arrival({
        code: "BA493",
        operator: "BA",
        time: "2020-09-09T11:11:08.978Z",
        status: "Arrived 11:11",
        to: "London Heathrow"
      })
    ]
  }
]


const arrivals: Array<DailyEvent<Arrival>> = 
[
  {
    "date": "Friday 19th of February 2021",
    "events": [
      new Arrival({
        code: "EZY8901",
        operator: "EasyJet",
        time: "2021-02-17T11:11:50.799Z",
        status: "Scheduled ",
        from: "London Gatwick"
      })
    ]
  },
  {
    "date": "Saturday 20th of February 2021",
    "events": [
      new Arrival({
        "code": "BA492",
        "operator": "BA",
        "time": "2021-02-17T14:14:50.799Z",
        "status": "Scheduled ",
        "from": "London Heathrow"
      })
    ]
  },
  {
    "date": "Sunday 21st of February 2021",
    "events": [
      new Arrival({
        "code": "EZY8901",
        "operator": "EasyJet",
        "time": "2021-02-17T11:11:50.799Z",
        "status": "Scheduled ",
        "from": "London Gatwick"
      })
    ]
  }
]

const departures: Array<DailyEvent<Departure>> = [
  {
    "date": "Friday 19th of February 2021",
    "events": [
      new Departure({
        "code": "EZY8902",
        "operator": "EasyJet",
        "time": "2021-02-17T12:12:59.400Z",
        "status": "Scheduled ",
        "to": "London Gatwick"
      })
    ]
  },
  {
    "date": "Saturday 20th of February 2021",
    "events": [
      new Departure({
        "code": "BA493",
        "operator": "BA",
        "time": "2021-02-17T15:15:59.400Z",
        "status": "Scheduled ",
        "to": "London Heathrow"
      })
    ]
  },
  {
    "date": "Sunday 21st of February 2021",
    "events": [
      new Departure({
        "code": "EZY8902",
        "operator": "EasyJet",
        "time": "2021-02-17T12:12:59.400Z",
        "status": "Scheduled ",
        "to": "London Gatwick"
      })
    ]
  }
]