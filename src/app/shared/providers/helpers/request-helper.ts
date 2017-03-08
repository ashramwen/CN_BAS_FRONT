import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { RootState } from '../../redux';
import { TokenState } from '../../redux/token/reducer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestHelper {

  constructor(
    private store: Store<RootState>
  ) { }
  
  public get headers(): Observable<Headers> {
    let headers = new Headers({
      'content-type': 'application/json'
    });

    return Observable.of(headers);
  }

  public get headersWithToken() {
    return this.store.select('token')  
      .map((tokenState: TokenState) => {
      let headers = new Headers({
        authorization: `Bearer ${tokenState.token}`
      });
      return headers;
      })
      .zip(this.headers)
      .map((s: Array<Headers>) => {
        let newHeaders = new Headers();
        
        s.forEach((header) => {
          header.forEach((values, name) => {
            values.forEach(value => {
              newHeaders.append(value, name);
            });
          });
        });

        return newHeaders;
      });
    
  }
}
