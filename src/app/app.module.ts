import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MaterialRootModule, OverlayContainer } from '@angular/material';
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
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { PortalModule } from './pages/+portal/portal.module';
import { instrumentation } from './shared/redux/index';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

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
    LoginCmp
  ],
  imports: [ // import Angular's modules
    // vendor modules
    BrowserModule,
    FormsModule,
    HttpModule,
    AppSharedModule,
    MaterialRootModule,
    ReactiveFormsModule,
    // have to comment this line when build:aot:prod
    // instrumentation,
    // StoreLogMonitorModule,
    LocalStorageModule.withConfig({
      prefix: 'bas',
      storageType: 'localStorage'
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    // LocalizeRouterModule.forRoot(ROUTES), // localize router
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),

    // app modules
    PortalModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    overlayContainer: OverlayContainer
  ) { }

}
