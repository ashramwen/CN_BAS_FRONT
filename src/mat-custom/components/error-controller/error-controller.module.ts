import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ErrorItemCmp } from './error-item/error-item.component';
import { ErrorContainerCmp } from './error-container/error-container.component';

@NgModule({
  declarations: [
    ErrorItemCmp,
    ErrorContainerCmp
  ],
  imports: [
    TranslateModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ],
  providers: [],
  exports: [ErrorItemCmp, ErrorContainerCmp]
})
export class ErrorControllerModule {
}
