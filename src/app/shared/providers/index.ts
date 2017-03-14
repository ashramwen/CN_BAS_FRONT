import { ConfigHelper } from './helpers/config-helper';
import { RequestHelper } from './helpers/request-helper';
import { SessionService } from './session.service';
import { GUARD_SERVICES } from './guards/index';
import { LocationService } from './location.service';
import { RESOLVERS } from './resolvers/index';
import { HELPER_SERVICES } from './helpers/index';

export const SHARED_PROVIDERS = [
  // helpers
  ...HELPER_SERVICES,
  
  // shared services
  SessionService,
  LocationService,

  // Route Guard services
  ...GUARD_SERVICES,

  // Route data resolvers
  ...RESOLVERS
];
