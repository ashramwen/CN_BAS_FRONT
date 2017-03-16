import { BeehiveClient } from './beehive-client.service';
import { ConfigHelper } from './config-helper';
import { RequestHelper } from './request-helper';
import { XHRBackend, RequestOptions,  } from '@angular/http';
import { Store } from '@ngrx/store';
import { RootState } from '../../redux/index';

export const HELPER_SERVICES = [
  {
    provide: BeehiveClient,
    deps: [
      XHRBackend,
      RequestOptions,
      Store,
      RequestHelper
    ],
    useFactory: (backend, options, store, requestHelper) => {
      return new BeehiveClient(backend, options, store, requestHelper);
    }
  },
  ConfigHelper,
  RequestHelper
];
