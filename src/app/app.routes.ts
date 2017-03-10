import { Routes } from '@angular/router';

import { LoginCmp } from './pages/login/login.component';
import { AuthGuard } from './shared/providers/guards/authen-guard.service';
import { LocationCmp } from './pages/location/location.component';
import { LocationResolver } from './shared/providers/resolvers/location-resolver.service';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginCmp,
  },
  {
    path: 'portal',
    loadChildren: './pages/+portal#PortalModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'location',
    component: LocationCmp,
    canActivate: [AuthGuard],
    resolve: {
      locations: LocationResolver
    }
  },
  { path: '**', redirectTo: 'login' }
];
