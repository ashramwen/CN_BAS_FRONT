import { NgModule } from '@angular/core';
import { BasMap } from './bas-map.component';
import { MaterialModule } from '@angular/material';
import { DevicePickerCmp } from './components/device-picker/device-picker.component';
import { LocationCardCmp } from './components/device-picker/location-card.component';
import { DeviceCheckCmp } from './components/device-picker/device-check.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BasMap, DevicePickerCmp, LocationCardCmp, DeviceCheckCmp],
  imports: [MaterialModule, CommonModule, FormsModule],
  providers: [],
  exports: [BasMap]
})
export class BasMapModule { }
