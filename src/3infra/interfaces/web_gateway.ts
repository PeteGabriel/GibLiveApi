export interface WebGateway {
  load(classId: string): Promise<Cheerio>
  setup(): Promise<void>
}