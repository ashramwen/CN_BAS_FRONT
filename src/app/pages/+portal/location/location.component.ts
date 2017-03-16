import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../shared/models/location.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'bas-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationCmp implements OnInit {

  public location$: Observable<Location>;

  constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.location$ = this.route.snapshot.data['locations'];
  }

}
