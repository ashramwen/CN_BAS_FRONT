import { ByTarget, ESObject, ESQueryOption, Must, Range, Terms } from './../models/es-object';
import { Headers, Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EsQueryService {

  private url: string;
  private options: RequestOptions;

  constructor(
    private http: Http
  ) {
    this.url = `${BASE_CONFIG.esUrl}${BASE_CONFIG.kiiAppID}/_search?pretty`;
    let headers = new Headers({ Authorization: 'Bearer super_token' });
    // this.options = new RequestOptions({ headers: headers });
  }

  public query(esObject: ESObject): Observable<any> {
    console.log('queryLight');
    return this.http.post(this.url, esObject)
      .map((r: Response) => r.json())
      .catch(this.handleError);
  }

  public queryLight(
    esQueryOption: ESQueryOption
  ): Observable<any> {
    let esObject = new ESObject();
    esObject.setOption(esQueryOption);

    // console.log('es', JSON.stringify(esObject));
    return this.query(esObject);
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
