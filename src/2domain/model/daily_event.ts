export class DailyEvent<T> {
  date: string;
  events: Array<T>;

  constructor(params) {
    this.date = params.date;
    this.events = params.events;
  }
}