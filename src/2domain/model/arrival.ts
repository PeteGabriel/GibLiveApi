import { Event } from "./event";

export class Arrival extends Event{
  
  constructor(params) {
    super()
    this.code = params.code;
    this.operator = params.operator;
    this.time = this.formatTime(params.time);
    this.status = params.status;
    this.from = params.from;
  }


}
