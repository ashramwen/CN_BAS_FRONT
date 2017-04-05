import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DeviceService } from '../../../../shared/providers/device.service';
import { Observable } from 'rxjs/Observable';
import { Thing } from '../../../../shared/models/thing.interface';

@Component({
  selector: 'bas-device-detail',
  templateUrl: 'device-detail.component.html',
  styleUrls: ['./device-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DeviceDetailCmp implements OnInit {
  public Lighting$: Thing;
  public commandHistory: Object[];
  public stateHistory: Object[];

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService) { }

  public getProfile() {
    console.log();
  }

  public getCommandHistory() {
    console.log('here');
    this.commandHistory = [];
    this.deviceService.fetchCommandHistoryByGlobalThingID(this.Lighting$.globalThingID)
      .subscribe((history: any) => {
        this.commandHistory = history;
        console.log('command history', this.commandHistory);
      });
  }

  public getStateHistory() {
    this.stateHistory = [];
    this.deviceService.fetchStateHistoryByVendorThingID(this.Lighting$.vendorThingID)
      .subscribe((history: any) => {
        this.stateHistory = history;
        console.log('state history', this.stateHistory);
      });
  }

  public ngOnInit() {
    this.Lighting$ = this.route.snapshot.data['lighting'];
    this.commandHistory = [];
    this.deviceService.fetchCommandHistoryByGlobalThingID(this.Lighting$.globalThingID)
      .subscribe((history: any) => {
        history.map((object) => {
          object.power = null;
          object.brightness = null;
          object.actions.forEach((action) => {
            action.turnPower ?
              object.power = action.turnPower.Power :
              object.brightness = action.setBri.Bri;
          });
          console.log('object', object);
        });
        this.commandHistory = history;
        console.log('command history', this.commandHistory);
      });
    this.stateHistory = [];
    this.deviceService.fetchStateHistoryByVendorThingID(this.Lighting$.vendorThingID)
      .subscribe((history: any) => {
        this.stateHistory = history.hits.map((object) => object._source.state);
        console.log('state history', this.stateHistory);
      });
  }
}
