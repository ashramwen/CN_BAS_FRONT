import { BuildingResolver } from '../../shared/providers/resolvers/building-resolver.service';
import { DeviceDetailCmp } from './device-list/device-detail/device-detail.component';
import { DeviceListCmp } from './device-list/device-list.component';
import { LandingCmp } from './landing/landing.component';
import { LightsResolver } from './../../shared/providers/resolvers/lights-resolver.service';
import { LocationCmp } from './location/location.component';
import { LocationResolver } from '../../shared/providers/resolvers/location-resolver.service';
import { MapViewCmp } from './map-view/map-view.component';
import { PortalCmp } from './portal.component';

export const routes = [
  {
    path: '',
    component: PortalCmp,
    children: [
      {
        path: 'landing',
        component: LandingCmp,
        resolve: {
          lightings: LightsResolver
        }
      },
      {
        path: 'location',
        component: LocationCmp,
        resolve: {
          locations: LocationResolver
        }
      },
      {
        path: 'map-view',
        component: MapViewCmp,
        resolve: {
          locations: LocationResolver,
          buildings: BuildingResolver
        }
      },
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'prefix',
      },
      {
        path: 'device-list',
        children: [
          {
            path: '',
            component: DeviceListCmp
          }, {
            path: ':id',
            component: DeviceDetailCmp
          }
        ]
      }
    ]
  },
];
