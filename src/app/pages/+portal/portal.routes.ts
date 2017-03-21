import { PortalCmp } from './portal.component';
import { LandingCmp } from './landing/landing.component';
import { LocationCmp } from './location/location.component';
import { LocationResolver } from '../../shared/providers/resolvers/location-resolver.service';
import { MapViewCmp } from './map-view/map-view.component';
import { BuildingResolver } from '../../shared/providers/resolvers/building-resolver.service';

export const routes = [
  {
    path: '',
    component: PortalCmp,
    children: [
      {
        path: 'landing',
        component: LandingCmp
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
    ]
  },
];
