import { Component, OnInit } from '@angular/core';
import { Status, Thing } from './../../../shared/models/thing.interface';

import { ActivatedRoute } from '@angular/router';
import { ESQueryOption } from './../../../shared/models/es-object';
import { EsQueryService } from './../../../shared/providers/es-query.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bas-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingCmp implements OnInit {

  /**
   * current On lights
   *
   * @type {number}
   * @memberOf LandingCmp
   */
  public numberOfOn: number;

  private lights$: Thing[];

  constructor(
    private route: ActivatedRoute,
    private esQuery: EsQueryService
  ) {
    this.numberOfOn = 0;
  }

  public ngOnInit() {
    this.lights$ = this.route.snapshot.data['lightings'];
    this.getNumberOfOn();

    let option = {
      startTime: 1490025600000,
      endTime: 1490111999999,
      groupByTarget: true,
      interval: '1d',
      power: true,
      target: ['th.aba700e36100-0f8a-6e11-cb0a-02218bb6',
        'th.aba700e36100-c718-6e11-25bc-02da73ea',
        'th.f83120e36100-1c9a-6e11-25bc-05f138ca']
    };

    this.esQuery.queryLight(option);
  }

  private getNumberOfOn() {
    this.lights$.forEach((thing: Thing) => {
      if (thing.status && !!thing.status['Power']) {
        this.numberOfOn++;
      }
    });
  }
}
