import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { ConfirmModal } from './confirm-modal.service';
import { ConfirmModalComponent } from './confirm-modal.component';


@NgModule({
  declarations: [
    ConfirmModalComponent,
  ],
  imports: [
    TranslateModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ],
  entryComponents: [ConfirmModalComponent],
  providers: [ConfirmModal]
})
export class ConfirmModalModule {
}
