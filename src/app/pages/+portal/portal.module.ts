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
import { LAYOUT_CMP } from './components/index';
import { LandingCmp } from './landing/landing.component';
import { LandingService } from './landing/landing.service';
import { LocationCmp } from './location/location.component';
import { MapViewCmp } from './map-view/map-view.component';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { PasswordChangeCmp } from './user-info.ts/password-change/password-change.component';
import { PortalCmp } from './portal.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserInfoCmp } from './user-info.ts/user-info.component';
import { routes } from './portal.routes';

@NgModule({
  declarations: [
    PortalCmp,
    LandingCmp,
    UserInfoCmp,
    PasswordChangeCmp,
    MapViewCmp,
    LAYOUT_CMP,
    DeviceListCmp,
    DeviceDetailCmp
  ],
  imports: [
    TranslateModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ConfirmModalModule,
    ErrorControllerModule,
    BasMapModule,
  ],
  entryComponents: [PasswordChangeCmp],
  exports: [PortalCmp],
  providers: [LandingService]
})
export class PortalModule {

}
