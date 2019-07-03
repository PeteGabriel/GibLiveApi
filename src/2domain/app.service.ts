import { Injectable } from '@nestjs/common';
import { Version } from './model/version';

@Injectable()
export class AppService {

  API_VERSION = 0.1;

  alive(): string {
    return JSON.stringify(new Version(this.API_VERSION));
  }
}
