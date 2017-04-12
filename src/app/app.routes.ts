import { Routes } from '@angular/router';

import { LoginCmp } from './pages/login/login.component';
import { AuthGuard } from './shared/providers/guards/authen-guard.service';
import { LocationResolver } from './shared/providers/resolvers/location-resolver.service';
import { Component } from '@angular/core';
import { DeviceListCmp } from './pages/+portal/device-list/device-list.component';
import { portalRoutes } from './pages/+portal/portal.routes';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginCmp,
  },
  {
    path: 'portal',
    children: [...portalRoutes],
    canActivate: [AuthGuard],
    resolve: {
      location: LocationResolver
    }
  },
  { path: '**', redirectTo: 'login' }
];
