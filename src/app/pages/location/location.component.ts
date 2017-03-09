import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../shared/models/location.interface';

@Component({
  selector: 'bas-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationCmp implements OnInit{

  public location: Location;  

  constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
     this.location = this.route.snapshot.data['locations'];
  }

}
