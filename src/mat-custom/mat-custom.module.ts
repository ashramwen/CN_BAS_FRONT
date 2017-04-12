import { NgModule } from '@angular/core';
import { MaterialRootModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MCCollapse } from './components/collapse/collapse.directive';
import { SIDENAV_CMPS } from './components/side-nav/index';
import { CMSideNavList } from './components/side-nav/side-nav-list/side-nav-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MCCollapse,
    ...SIDENAV_CMPS
  ],
  exports: [
    CMSideNavList
  ],
  imports: [MaterialRootModule, FormsModule, CommonModule, RouterModule],
  providers: []
})
export class MatCustomModule {

}
