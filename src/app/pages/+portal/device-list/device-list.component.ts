import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../../../shared/providers/device.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'bas-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListCmp implements OnInit {
  public deviceList: Object[];

  constructor(private router: Router, private deviceService: DeviceService) {
  }

  public deviceDetail(item) {
    this.router.navigate(['/portal/device-list', item.vendorThingID]);
  }

  public ngOnInit() {
    this.deviceList = [];
    this.deviceService.fetchLightings().subscribe((results: any) => {
      this.deviceList = results;
      console.log(results);
    });
  }
}
