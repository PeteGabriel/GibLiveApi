import { Event } from "./event";

export class Departure extends Event{

  constructor(params) {
    super()
    this.code = params.code;
    this.operator = params.operator;
    this.time = params.time
    this.status = params.status.toLowerCase();
    this.to = params.to;
    this.date = ""
  }

}
