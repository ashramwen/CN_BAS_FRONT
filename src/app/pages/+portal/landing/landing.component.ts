import { Component, OnInit } from '@angular/core';
import { Status, Thing } from './../../../shared/models/thing.interface';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'bas-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingCmp implements OnInit {

  public lightings$: Observable<Thing>;
  constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.lightings$ = this.route.snapshot.data['lightings'];
  }

}
