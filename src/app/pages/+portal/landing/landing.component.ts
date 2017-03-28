import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { ESQueryOption } from './../../../shared/models/es-object';
import { ESResponse } from './../../../shared/models/es-response.interface';
import { EsQueryService } from './../../../shared/providers/es-query.service';
import { Message } from 'stompjs';
import { StompService } from './../../../shared/providers/stomp.service';
import { StompThing } from './../../../shared/models/stomp-thing.interface';
import { Thing } from './../../../shared/models/thing.interface';

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

  /**
   * array of thingID
   *
   * @type {string[]}
   * @memberOf LandingCmp
   */
  public thingIDs: string[];
  public punchData: number[];

  private light$: Observable<any>;

  private lights: Thing[];

  constructor(
    private route: ActivatedRoute,
    private esQuery: EsQueryService,
    private stomp: StompService
  ) {
    this.numberOfPowerOn = 0;
    this.numberOfConnected = 0;
  }

  public ngOnInit() {
    this.stomp.onMessage(this.getMessage);
    this.stomp.subscribe('/topic/493e83c9/th.f83120e36100-02d8-6e11-cb0a-0fa10ec4');
    this.lights = this.route.snapshot.data['lightings'];
    this.parseData();

    this.light$ = this.esQuery.queryLight({
      startTime: moment().day(-7).startOf('day').valueOf(),
      endTime: moment().day(-1).endOf('day').valueOf(),
      groupByTarget: true,
      interval: '1h',
      power: true,
      target: this.thingIDs
    });

    this.light$.subscribe((r: ESResponse) => {
      this.punchData = r.aggregations.byTime.buckets.map((o) => o.doc_count);
    });
  }

  private getMessage(message: StompThing) {
    console.log(message);
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
