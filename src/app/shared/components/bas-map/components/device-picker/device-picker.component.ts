import {
  Component,
  Input,
  ViewEncapsulation,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { StateService } from '../../providers/state.service';

export interface DeviceCheck {
  deviceID: string;
  checked: boolean;
}

@Component({
  selector: 'bm-device-picker',
  templateUrl: './device-picker.component.html',
  styleUrls: ['./device-picker.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('active', style({ opacity: 1, transform: 'translateX(0)' })),
      state('inactive', style({ opacity: 0, transform: 'translateX(130%)' })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class DevicePickerCmp {

  @Input()
  public active: boolean;

  public deviceList: DeviceCheck[] = [{
    deviceID: '0807W-W01001',
    checked: false
  }, {
    deviceID: '0807W-W01002',
    checked: false
  }];

  @Input() public locations: Location[];

  constructor(
    private myState: StateService
  ) { }
}
