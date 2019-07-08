export class Arrival {
  code: string;
  operator: string;
  time: string;
  status: string;
  from: string;

  constructor(params) {
    this.code = params.code;
    this.operator = params.operator;
    this.time = this.formatTime(params.extendedDate, params.time);
    this.status = params.status;
    this.from = params.from;
  }

  private formatTime(extendedDate: string, time: string): string{
    const date = new Date()
    date.setHours(this.parseHours(time))
    date.setMinutes(this.parseMinutes(time))
    return date.toISOString()
  }


  private parseHours(time: string): number{
    const parts = time.split(':')
    let hours = 0
    if (parts.length > 1){
      hours = Number.parseInt(parts[0])
    }
    return hours
  }

  private parseMinutes(time: string): number{
    const parts = time.split(':')
    let minutes = 0
    if (parts.length > 1){
      minutes = Number.parseInt(parts[0])
    }
    return minutes
  }

}
