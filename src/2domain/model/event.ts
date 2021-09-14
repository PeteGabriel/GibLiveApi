export abstract class Event {
  protected code: string;
  protected operator: string;
  protected date: string;
  protected time: string;
  protected status: string;
  protected from: string;
  protected to: string;


  setDate(date: string): void {
    this.date = date
  }

  getStatus(): string {
    return this.status
  }

  getTime(): string {
    return this.time
  }
}
