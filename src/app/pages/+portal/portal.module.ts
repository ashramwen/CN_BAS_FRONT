import { NgModule } from '@angular/core';
import { PortalCmp } from './portal.component';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './portal.routes';
import { LandingCmp } from './landing/landing.component';
import { CommonModule } from '@angular/common';
import { LAYOUT_CMP } from './components/index';
import { TranslateModule } from '@ngx-translate/core';
import { LocationCmp } from './location/location.component';
import { UserInfoCmp } from './user-info.ts/user-info.component';
import { PasswordChangeCmp } from './user-info.ts/password-change/password-change.component';
import { AppSharedModule } from '../../shared/shared.module';
import { ErrorControllerModule } from '../../shared/components/error-controller/error-controller.module';
import { ConfirmModalModule } from '../../shared/components/confirm-modal/confirm-modal.module';


@NgModule({
  declarations: [
    PortalCmp,
    LandingCmp,
    LocationCmp,
    UserInfoCmp,
    PasswordChangeCmp,
    LAYOUT_CMP
  ],
  imports: [
    TranslateModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ConfirmModalModule,
    ErrorControllerModule
  ],
  entryComponents: [PasswordChangeCmp],
  exports: [PortalCmp],
  providers: []
})
export class PortalModule {

}
