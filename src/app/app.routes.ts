import { Routes } from '@angular/router';

import { LoginCmp } from './pages/login/login.component';
import { AuthGuard } from './shared/providers/guards/authen-guard.service';
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
    canActivate: [AuthGuard],
    resolve: {
      location: LocationResolver
    }
  },
  { path: '**', redirectTo: 'login' }
];
