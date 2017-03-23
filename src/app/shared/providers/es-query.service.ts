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
    option: ESQueryOption
  ) {
    let esObject = new ESObject();

    let must = new Must();
    must.terms = new Terms();
    must.terms['state.Power'] = [option.power ? 1 : 0];
    esObject.query.filtered.filter.bool.must.push(must);

    must = new Must();
    must.terms = new Terms();
    must.terms['state.target'] = option.target;
    esObject.query.filtered.filter.bool.must.push(must);

    must = new Must();
    must.range = new Range(option.startTime, option.endTime);
    esObject.query.filtered.filter.bool.must.push(must);

    esObject.aggs.byTime.date_histogram.interval = option.interval;

    if (option.groupByTarget) {
      esObject.aggs.byTarget = new ByTarget();
    }

    // console.log('es', JSON.stringify(esObject));
  }
}
