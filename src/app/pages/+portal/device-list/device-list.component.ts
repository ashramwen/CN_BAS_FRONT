import { Component, OnInit } from '@angular/core';

import { DeviceService } from '../../../shared/providers/device.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { RootState } from '../../../shared/redux/index';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { Thing } from '../../../shared/models/thing.interface';

@Component({
  selector: 'bas-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListCmp implements OnInit {
  public lightings$: Observable<Thing>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<RootState>,
    private deviceService: DeviceService,
    private router: Router) {
  }

  public deviceDetail(item) {
    console.log('go device detail');
    // this.store.dispatch(go(['/portal/device-list', item.vendorThingID]));
    this.router.navigate(['/portal/device-list', item.vendorThingID]);

  }

  public ngOnInit() {
    this.lightings$ = this.route.snapshot.data['lightings'];
  }
}
