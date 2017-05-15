import { NgModule } from '@angular/core';
import { BasMap } from './bas-map.component';
import { MaterialModule } from '@angular/material';
import { DevicePickerCmp } from './components/device-picker/device-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationPickerCmp } from './components/location-picker/location-picker.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  DeviceSelectorCmp
} from './components/device-picker/device-selector/device-selector.component';
import {
  LocationSelectorCmp
} from './components/device-picker/location-selector/location-selector.component';
import { PipesModule } from '../../pipes/pipes.module';
import { MapViewCmp } from './components/map-view/map-view.component';

@NgModule({
  declarations: [
    BasMap,
    DevicePickerCmp,
    LocationPickerCmp,
    LocationSelectorCmp,
    DeviceSelectorCmp,
    MapViewCmp
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    PipesModule
  ],
  providers: [],
  exports: [BasMap]
})
export class BasMapModule { }
