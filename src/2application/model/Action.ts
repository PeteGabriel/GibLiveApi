class Action {
  readonly time: Date;
  readonly flight: string;
  readonly operator: string;
  readonly to: string;
  readonly status: string;

  constructor(time: Date, 
    fligth: string, 
    operator: string, 
    to: string,
    status: string){
      this.time = time;
      this.flight = fligth;
      this.to = to;
      this.status = status;
      this.operator = operator;
  }

}