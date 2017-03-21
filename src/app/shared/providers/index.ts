import { ConfigHelper } from './helpers/config-helper';
import { GUARD_SERVICES } from './guards/index';
import { HELPER_SERVICES } from './helpers/index';
import { LocationService } from './location.service';
import { MapService } from './map.service';
import { RESOLVERS } from './resolvers/index';
import { RequestHelper } from './helpers/request-helper';
import { SessionService } from './session.service';
import { ThingService } from './thing.service';

export const SHARED_PROVIDERS = [
  // helpers
  ...HELPER_SERVICES,

  // shared services
  ThingService,
  SessionService,
  LocationService,
  MapService,

  // Route Guard services
  ...GUARD_SERVICES,

  // Route data resolvers
  ...RESOLVERS
];
