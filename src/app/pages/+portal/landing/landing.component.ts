import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { Status, Thing } from './../../../shared/models/thing.interface';

import { ActivatedRoute } from '@angular/router';
import { ESQueryOption } from './../../../shared/models/es-object';
import { EsQueryService } from './../../../shared/providers/es-query.service';
import { Observable } from 'rxjs';

// five minutes
const FIVE_MINUTES = 300000;

@Component({
  selector: 'bas-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingCmp implements OnInit {

  /**
   * number of Power On lights
   *
   * @type {number}
   * @memberOf LandingCmp
   */
  public numberOfPowerOn: number;

  /**
   * number of connected lights
   *
   * @type {number}
   * @memberOf LandingCmp
   */
  public numberOfConnected: number;
  public thingIDs: string[];

  private light$: Observable<any>;

  private lights: Thing[];

  constructor(
    private route: ActivatedRoute,
    private esQuery: EsQueryService
  ) {
    this.numberOfPowerOn = 0;
    this.numberOfConnected = 0;
  }

  public ngOnInit() {
    this.lights = this.route.snapshot.data['lightings'];
    this.parseData();

    let option = {
      startTime: 1490025600000,
      endTime: 1490111999999,
      groupByTarget: true,
      interval: '1d',
      power: true,
      target: this.thingIDs
    };

    this.light$ = this.esQuery.queryLight(option);

    // this.light$ = this.esQuery.queryLight({
    //   startTime: moment().day(-7).startOf('day').valueOf(),
    //   endTime: moment().day(-1).endOf('day').valueOf(),
    //   groupByTarget: false,
    //   interval: '1d',
    //   power: true,
    //   target: this.thingIDs
    // });
  }

  private parseData() {
    this.thingIDs = [];
    let now = new Date().valueOf();
    this.lights.forEach((thing: Thing) => {
      this.thingIDs.push(thing.kiiThingID);
      this.countNumberOfPowerOn(thing);
      this.countNumberOfConnected(thing, now);
    });
  }

  private countNumberOfPowerOn(thing: Thing) {
    if (!thing.status || !thing.status.Power) { return; }
    this.numberOfPowerOn++;
  }

  private countNumberOfConnected(thing: Thing, timeStamp: number) {
    if (!thing.status || !thing.status.date) { return; }
    if (thing.status.date + FIVE_MINUTES < timeStamp) { return; }
    this.numberOfConnected++;
  }
}
