import { Routes } from '@angular/router';

import { LoginCmp } from './pages/login/login.component';
import { LandingCmp } from './pages/landing/landing.component';

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
    path: 'landing',
    component: LandingCmp
  }
];
