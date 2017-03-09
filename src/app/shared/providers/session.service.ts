import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers} from '@angular/http';
import { Credential } from '../models/credential.interface';
import { ConfigHelper } from './helpers/config-helper';
import { RESOURCE_URLS } from '../constants/resource-urls';
import { RequestHelper } from './helpers/request-helper';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {

  constructor(
    private http: Http,
    private configHelper: ConfigHelper,
    private requestHelper: RequestHelper
  ) { }
  
  public login(credential: Credential) {
    let headers: Headers;
    this.requestHelper.headers.subscribe((_headers) => {
      headers = _headers;
    });
    let url = this.configHelper.buildUrl(RESOURCE_URLS.AUTH, ['login']);
    let requestOptions: RequestOptionsArgs = {
      headers: headers
    };

    return this.http
      .post(url, credential, requestOptions);
  }

  public logout() {
    return Observable.of().delay(0);
  }
}
