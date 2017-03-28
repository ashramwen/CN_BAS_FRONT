import { ConfigHelper } from './helpers/config-helper';
import { DeviceService } from './device.service';
import { EsQueryService } from './es-query.service';
import { GUARD_SERVICES } from './guards/index';
import { HELPER_SERVICES } from './helpers/index';
import { LocationService } from './location.service';
import { MapService } from './map.service';
import { RESOLVERS } from './resolvers/index';
import { RequestHelper } from './helpers/request-helper';
import { SessionService } from './session.service';
import { StompService } from './stomp.service';

export const SHARED_PROVIDERS = [
  // helpers
  ...HELPER_SERVICES,

  // shared services
  SessionService,
  LocationService,
  MapService,
  DeviceService,
  EsQueryService,
  StompService,

  // Route Guard services
  ...GUARD_SERVICES,

  // Route data resolvers
  ...RESOLVERS
];
