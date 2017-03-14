import { PortalCmp } from './portal.component';
import { LandingCmp } from './landing/landing.component';
import { LocationCmp } from './location/location.component';
import { LocationResolver } from '../../shared/providers/resolvers/location-resolver.service';

export const routes = [
  {
    path: '', component: PortalCmp, children: [
      {
        path: 'landing', component: LandingCmp
      },
      {
        path: 'location',
        component: LocationCmp,
        resolve: {
          locations: LocationResolver
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
