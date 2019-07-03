export class Arrival {
  code: string;
  operator: string;
  time: string;
  status: string;
  from: string;

  constructor(params) {
    this.code = params.code;
    this.operator = params.operator;
    this.time = params.time;
    this.status = params.status;
    this.from = params.from;
  }
}
