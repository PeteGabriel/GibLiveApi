import { Arrival } from './arrival';
import { Departure } from './departure';

export class Flight {
  date: string;
  arrivals: [Arrival];
  departures: [Departure];

  constructor(props) {
    this.date = props.date;
    this.arrivals = props.arrivals;
    this.departures = props.departures;
  }
}
