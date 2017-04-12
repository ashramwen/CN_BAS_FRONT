import { BasMapModule } from '../../../shared/components/bas-map/bas-map.module';
import { CommonModule } from '@angular/common';
import { DeviceDetailCmp } from './device-list/device-detail/device-detail.component';
import { DeviceListCmp } from './device-list/device-list.component';
import { FormsModule } from '@angular/forms';
import { LandingCmp } from './landing/landing.component';
import { LandingService } from './landing/landing.service';
import { MapViewCmp } from './map-view/map-view.component';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { PunchCardComponent } from './landing/punch-card/punch-card.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    BasMapModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
    LandingCmp,
    MapViewCmp,
    DeviceListCmp,
    DeviceDetailCmp,
    PunchCardComponent,
  ],
  providers: [LandingService]
})
export class LightManagementModule {

}
