import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppSharedModule } from '../../shared/shared.module';
import { ConfirmModalModule } from '../../shared/components/confirm-modal/confirm-modal.module';

import {
  ErrorControllerModule,
} from '../../shared/components/error-controller/error-controller.module';
import { LAYOUT_CMP } from './components/index';
import { PasswordChangeCmp } from './user-info.ts/password-change/password-change.component';
import { PortalCmp } from './portal.component';
import { UserInfoCmp } from './user-info.ts/user-info.component';
import { MatCustomModule } from '../../../mat-custom/mat-custom.module';
import { LightManagementModule } from './light-management/light-management.module';

@NgModule({
  declarations: [
    PortalCmp,
    UserInfoCmp,
    PasswordChangeCmp,
    LAYOUT_CMP,
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
    MatCustomModule,
    RouterModule,
    
    LightManagementModule
  ],
  entryComponents: [PasswordChangeCmp],
  exports: [PortalCmp],
})
export class PortalModule {

}
