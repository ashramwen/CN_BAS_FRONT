import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable()
export class DataResolver implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return Observable.of({ res: 'I am data'});
    
    return new Observable((subscriber: Subscriber<any>) => {
      console.log('start');
      setTimeout(() => {
        console.log('send');
        subscriber.next({ data: 'im a data' });
        subscriber.complete();
      }, 5000);
    });
  }
}

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
  DataResolver
];
