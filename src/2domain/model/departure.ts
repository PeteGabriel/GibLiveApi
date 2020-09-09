import { Event } from "./event";

export class Departure extends Event{
  code: string;
  operator: string;
  time: string;
  status: string;
  to: string;

  constructor(params) {
    super()
    this.code = params.code;
    this.operator = params.operator;
    this.time = this.formatTime(params.time);
    this.status = params.status;
    this.to = params.to;
  }
}
