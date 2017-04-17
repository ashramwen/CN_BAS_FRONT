import { NgModule } from '@angular/core';
import { BasMap } from './bas-map.component';
import { MaterialModule } from '@angular/material';
import { DevicePickerCmp } from './components/device-picker/device-picker.component';
import { LocationCardCmp } from './components/device-picker/location-card.component';
import { DeviceCheckCmp } from './components/device-picker/device-check.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationPickerCmp } from './components/location-picker/location-picker.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    BasMap,
    DevicePickerCmp,
    LocationCardCmp,
    DeviceCheckCmp,
    LocationPickerCmp,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  exports: [BasMap]
})
export class BasMapModule { }
