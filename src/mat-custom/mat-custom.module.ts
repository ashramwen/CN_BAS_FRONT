import { NgModule } from '@angular/core';
import { MaterialRootModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MCCollapse } from './components/collapse/collapse.directive';
import { SIDENAV_CMPS } from './components/side-nav/index';
import { CMSideNavList } from './components/side-nav/side-nav-list/side-nav-list.component';
import { ToolbarSubTitle } from './components/toolbar-sub-title/toolbar-sub-title.component';

@NgModule({
  declarations: [
    MCCollapse,
    ToolbarSubTitle,
    ...SIDENAV_CMPS
  ],
  exports: [
    CMSideNavList,
    ToolbarSubTitle
  ],
  imports: [MaterialRootModule, FormsModule, CommonModule, RouterModule],
  providers: []
})
export class MatCustomModule {

}
