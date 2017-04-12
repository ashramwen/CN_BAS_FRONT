import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppSharedModule } from '../../shared/shared.module';
import { BasMapModule } from '../../shared/components/bas-map/bas-map.module';
import { CommonModule } from '@angular/common';
import { ConfirmModalModule } from '../../shared/components/confirm-modal/confirm-modal.module';
import { DeviceDetailCmp } from './device-list/device-detail/device-detail.component';
import { DeviceListCmp } from './device-list/device-list.component';
import {
  ErrorControllerModule,
} from '../../shared/components/error-controller/error-controller.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LAYOUT_CMP } from './components/index';
import { LandingCmp } from './landing/landing.component';
import { LandingService } from './landing/landing.service';
import { MapViewCmp } from './map-view/map-view.component';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { PasswordChangeCmp } from './user-info.ts/password-change/password-change.component';
import { PortalCmp } from './portal.component';
import { PunchCardComponent } from './components/punch-card/punch-card.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserInfoCmp } from './user-info.ts/user-info.component';
import { MatCustomModule } from '../../../mat-custom/mat-custom.module';

@NgModule({
  declarations: [
    PortalCmp,
    LandingCmp,
    UserInfoCmp,
    PasswordChangeCmp,
    MapViewCmp,
    LAYOUT_CMP,
    DeviceListCmp,
    DeviceDetailCmp,
    PunchCardComponent
  ],
  imports: [
    AppSharedModule,
    TranslateModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    ConfirmModalModule,
    ErrorControllerModule,
    BasMapModule,
    MatCustomModule,
    RouterModule
  ],
  entryComponents: [PasswordChangeCmp],
  exports: [PortalCmp],
  providers: [LandingService]
})
export class PortalModule {

}
