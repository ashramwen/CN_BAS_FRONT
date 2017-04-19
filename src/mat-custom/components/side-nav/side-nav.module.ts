import { NgModule } from '@angular/core';
import { SIDENAV_CMPS } from './index';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ContentContainerModule } from '../content-container/content-container.module';
import { RouterModule } from '@angular/router';
import { CollapseModule } from '../collapse/collapse.module';

@NgModule({
  declarations: [
    ...SIDENAV_CMPS
  ],
  imports: [
    TranslateModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    ContentContainerModule,
    RouterModule,
    CollapseModule
  ],
  exports: [
    ...SIDENAV_CMPS
  ]
})
export class SideNavModule { }
