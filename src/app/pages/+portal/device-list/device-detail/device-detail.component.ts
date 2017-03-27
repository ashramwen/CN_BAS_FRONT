import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../../../../shared/providers/device.service';
import { Observable } from 'rxjs/Observable';
import { Thing } from '../../../../shared/models/thing.interface';

@Component({
  selector: 'bas-device-detail',
  templateUrl: 'device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})

export class DeviceDetailCmp implements OnInit {
  public Lighting$: Thing;
  public commandHistory: Object;
  public stateHistory: Object;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService) { }

  public getCommandHistory() {
    this.commandHistory = {};
    this.deviceService.fetchCommandHistoryByGlobalThingID(this.Lighting$.globalThingID)
      .subscribe((history: any) => {
        this.commandHistory = history;
        console.log('command history', this.commandHistory);
      });
  }

  public getStateHistory() {
    this.stateHistory = {};
    this.deviceService.fetchStateHistoryByVendorThingID(this.Lighting$.vendorThingID)
      .subscribe((history: any) => {
        this.stateHistory = history;
        console.log('state history', this.stateHistory);
      });
  }

  public ngOnInit() {
    this.Lighting$ = this.route.snapshot.data['lighting'];
  }
}
