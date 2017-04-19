import { NgModule } from '@angular/core';
import { MaterialRootModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MCCollapse } from './components/collapse/collapse.directive';
import { SIDENAV_CMPS } from './components/side-nav/index';
import { CMSideNavList } from './components/side-nav/side-nav-list/side-nav-list.component';
import { ToolbarSubTitle } from './components/content-container/toolbar-sub-title.component';
import { ContentContainer } from './components/content-container/content-container.component';
import { CUSTOM_MODULES, CUSTOM_PROVIDERS } from './components/index';

@NgModule({
  declarations: [
  ],
  exports: [
    ...CUSTOM_MODULES,
  ],
  imports: [
    MaterialRootModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ...CUSTOM_MODULES
  ],
  providers: [
    ...CUSTOM_PROVIDERS
  ]
})
export class MatCustomModule {

}
