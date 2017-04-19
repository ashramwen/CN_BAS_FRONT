import { NgModule } from '@angular/core';
import { ContentContainer } from './content-container.component';
import { ToolbarSubTitle } from './toolbar-sub-title.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ContentContainer,
    ToolbarSubTitle
  ],
  imports: [
    TranslateModule,
    FormsModule,
    MaterialModule,
    CommonModule,
  ],
  exports: [
    ContentContainer,
    ToolbarSubTitle
  ]
})
export class ContentContainerModule { }
