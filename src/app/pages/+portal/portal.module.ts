import { NgModule } from '@angular/core';
import { PortalCmp } from './portal.component';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './portal.routes';
import { LandingCmp } from './landing/landing.component';
import { CommonModule } from '@angular/common';
import { LAYOUT_CMP } from './components/index';


@NgModule({
  declarations: [
    PortalCmp,
    LandingCmp,
    LAYOUT_CMP
  ],
  imports: [
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [PortalCmp],
  providers: []
})
export class PortalModule {

}