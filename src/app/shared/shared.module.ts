import { EFFECTS, instrumentation, reducer } from './redux/index';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { AlertModal } from './components/alert-modal/alert-modal.service';
import { BrowserModule } from '@angular/platform-browser';
import { DBModule } from '@ngrx/db';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterStoreModule } from '@ngrx/router-store';
import { SHARED_COMPONENTS } from './components/index';
import { SHARED_DIRECTIVES } from './directives/index';
import { SHARED_PROVIDERS } from './providers/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TokenEffects } from './redux/token/effects';
import { schema } from '../configs/db';

@NgModule({
  imports: [
    FormsModule,
    ...EFFECTS,
    DBModule.provideDB(schema),
    StoreModule.provideStore(reducer),
    HttpModule,
    RouterStoreModule.connectRouter(),
    ...SHARED_COMPONENTS
  ],
  exports: [SHARED_COMPONENTS, SHARED_DIRECTIVES],
  declarations: [...SHARED_DIRECTIVES],
  providers: [...SHARED_PROVIDERS, AlertModal],
})
export class AppSharedModule { }
