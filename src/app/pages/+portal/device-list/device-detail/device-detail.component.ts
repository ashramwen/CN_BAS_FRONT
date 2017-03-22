import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../../../../shared/providers/device.service';

@Component({
  selector: 'bas-device-detail',
  templateUrl: 'device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})

export class DeviceDetailCmp implements OnInit {
  public device: any;
  public commandHistory: Object[];
  public stateHistory: Object[];
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService) { }

  public ngOnInit() {
    this.device = {};
    this.route.params
      .switchMap((params: Params) => this.deviceService.fetchDeviceByVendorThingID(params['id']))
      .subscribe((device) => {
        this.device = device;
        this.deviceService.fetchCommendHistoryByGlobalThingID(this.device.globalThingID)
          .subscribe((history: any) => {
            this.commandHistory = history;
          });
        this.deviceService.fetchStateHistoryByVendorThingID(this.device.vendorThingID)
          .subscribe((history: any) => {
            this.stateHistory = history;
          });
      });
  }
}
