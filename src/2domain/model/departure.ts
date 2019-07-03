export class Departure {
  code: string;
  operator: string;
  time: string;
  status: string;
  to: string;

  constructor(params) {
    this.code = params.code;
    this.operator = params.operator;
    this.time = params.time;
    this.status = params.status;
    this.to = params.to;
  }
}
