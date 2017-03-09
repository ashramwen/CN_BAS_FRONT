import { NgModule } from '@angular/core';
import { SHARED_COMPONENTS } from './components/index';
import { SHARED_DIRECTIVES } from './directives/index';
import { SHARED_PROVIDERS } from './providers/index';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { EFFECTS, reducer } from './redux/index';
import { schema } from '../configs/db';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ...EFFECTS,
    DBModule.provideDB(schema),
    StoreModule.provideStore(reducer),
    HttpModule,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 15,
      monitor: useLogMonitor({ visible: false, position: 'right' })
    }),
    RouterStoreModule.connectRouter()
  ],
  exports: [SHARED_COMPONENTS, SHARED_DIRECTIVES],
  declarations: [SHARED_COMPONENTS, SHARED_DIRECTIVES],
  providers: [SHARED_PROVIDERS],
})
export class AppSharedModule { }
