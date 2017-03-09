import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialRootModule } from '@angular/material';
import {
  NgModule,
  ApplicationRef,
  OpaqueToken
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { StoreLogMonitorModule } from '@ngrx/store-log-monitor';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppCmp } from './app.component';
import { LoginCmp } from './pages/login/login.component';

import '../styles/styles.scss';
import '../styles/headings.css';
import { AppSharedModule } from './shared/shared.module';
import { BASE_CONFIG, AppConfigToken } from './app.config';
import { LandingCmp } from './pages/landing/landing.component';
import { StoreModule } from '@ngrx/store';
import { LocationCmp } from './pages/location/location.component';

// Application wide providers
const APP_PROVIDERS = [
  
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppCmp],
  declarations: [
    AppCmp,
    LoginCmp,
    LandingCmp,
    LocationCmp
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    AppSharedModule,
    MaterialRootModule,
    StoreLogMonitorModule,
    LocalStorageModule.withConfig({
      prefix: 'bas',
      storageType: 'localStorage'
    })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    {
      provide: AppConfigToken,
      useValue: BASE_CONFIG[ENV]
    },
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
  ) {}

}
