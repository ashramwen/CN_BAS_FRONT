import { ByTarget, ESObject, ESQueryOption, Must, Range, Terms } from './../models/es-object';
import { Http, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EsQueryService {

  private url: string;

  constructor(
    private http: Http
  ) {
    this.url = `${BASE_CONFIG.esUrl}${BASE_CONFIG.kiiAppID}_search?pretty`;
  }

  public query(esObject: ESObject): Observable<any> {
    return this.http.post(this.url, esObject)
      .map((res: Response) => res.json());
  }

  public queryLight(
    esQueryOption: ESQueryOption
  ) {
    let esObject = new ESObject();
    esObject.setOption(esQueryOption);

    console.log('es', JSON.stringify(esObject));
  }
}
