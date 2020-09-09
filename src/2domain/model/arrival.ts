import { Event } from "./event";

export class Arrival extends Event{
  code: string;
  operator: string;
  time: string;
  status: string;
  from: string;

  constructor(params) {
    super()
    this.code = params.code;
    this.operator = params.operator;
    this.time = this.formatTime(params.time);
    this.status = params.status;
    this.from = params.from;
  }


}
