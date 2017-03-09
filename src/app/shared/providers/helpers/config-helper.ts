import { Inject, Injectable} from '@angular/core';
import { AppConfigToken, AppConfig } from '../../../app.config';
const path = require('path');

@Injectable()
export class ConfigHelper {
  
  constructor(
    @Inject(AppConfigToken) private config: AppConfig
  ) { }

  public buildUrl(apiPath: string, paths: string[] = []) {
    return [this.config.siteUrl, path.join('api', apiPath), ...paths].join('/');
  }
}
