import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';
import { DeviceService } from '../../../shared/providers/device.service';

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
    this.deviceService.fetchDevices().subscribe((results: any) => {
      this.deviceList = results;
      console.log(results);
    });
  }
}
