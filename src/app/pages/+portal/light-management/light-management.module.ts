import { BasMapModule } from '../../../shared/components/bas-map/bas-map.module';
import { CalendarModule } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { DeviceDetailCmp } from './device-list/device-detail/device-detail.component';
import { DeviceListCmp } from './device-list/device-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { LandingCmp } from './landing/landing.component';
import { LandingService } from './landing/landing.service';
import { MapViewCmp } from './map-view/map-view.component';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { PunchCardComponent } from './landing/punch-card/punch-card.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatCustomModule } from '../../../../mat-custom/mat-custom.module';

@NgModule({
  imports: [
    BasMapModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    CalendarModule.forRoot(),
    MatCustomModule
  ],
  declarations: [
    LandingCmp,
    MapViewCmp,
    DeviceListCmp,
    DeviceDetailCmp,
    PunchCardComponent
  ],
  providers: [LandingService]
})
export class LightManagementModule {

}
