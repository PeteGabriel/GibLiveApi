export abstract class Event {
  code: string;
  operator: string;
  time: string;
  status: string;
  from: string;
  to: string;


  protected formatTime(time: string): string{
    const date = new Date()
    date.setHours(this.parseHours(time))
    date.setMinutes(this.parseMinutes(time))
    return date.toISOString()
  }


  private parseHours(time: string): number{
    if (time =="" || time == undefined){
      return -1
    }
    const parts = time.split(':')
    let hours = 0
    if (parts.length > 1){
      hours = Number.parseInt(parts[0])
    }
    return hours
  }

  private parseMinutes(time: string): number{
    if (time =="" || time == undefined){
      return -1
    }
    const parts = time.split(':')
    let minutes = 0
    if (parts.length > 1){
      minutes = Number.parseInt(parts[0])
    }
    return minutes
  }

}