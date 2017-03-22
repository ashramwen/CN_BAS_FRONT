import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bm-device-picker',
  templateUrl: './device-picker.component.html',
  styleUrls: ['./device-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DevicePickerCmp {

  @Input() locations: Location[];  
  
  constructor(

  ) { }
}
