import { BuildingResolver } from '../../shared/providers/resolvers/building-resolver.service';
import { DeviceDetailCmp } from './device-list/device-detail/device-detail.component';
import { DeviceListCmp } from './device-list/device-list.component';
import { LandingCmp } from './landing/landing.component';
import { LightsResolver } from './../../shared/providers/resolvers/lights-resolver.service';
import { LocationCmp } from './location/location.component';
import { LocationResolver } from '../../shared/providers/resolvers/location-resolver.service';
import { MapViewCmp } from './map-view/map-view.component';
import { PortalCmp } from './portal.component';
import { LightResolver } from '../../shared/providers/resolvers/light-resolver.service';
import { lightManagementRoutes } from './light-management/light-management.routes';

export const portalRoutes = [
  {
    path: '',
    component: PortalCmp,
    children: [{
      path: 'light-management',
      children: [...lightManagementRoutes]
    }, {
      path: '',
      redirectTo: 'light-management',
      pathMatch: 'prefix',
    }],
  },
];
