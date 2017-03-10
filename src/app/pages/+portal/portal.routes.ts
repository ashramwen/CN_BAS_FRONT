import { PortalCmp } from './portal.component';
import { LandingCmp } from './landing/landing.component';

export const routes = [
  { path: '', component: PortalCmp, children: [
    { path: 'landing', component: LandingCmp },
  ]},
];
