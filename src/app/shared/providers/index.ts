import { ConfigHelper } from './helpers/config-helper';
import { RequestHelper } from './helpers/request-helper';
import { SessionService } from './session.service';

export const SHARED_PROVIDERS = [
  // helpers
  ConfigHelper, RequestHelper,
  
  // shared services
  SessionService
];