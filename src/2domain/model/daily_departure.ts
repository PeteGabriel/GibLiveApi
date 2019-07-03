import { Departure } from "./departure";

export class DailyDeparture {
  date: string;
  departures: Array<Departure>;

  constructor(params) {
    this.date = params.date;
    this.departures = params.departures;
  }
}