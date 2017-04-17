import { Component, OnInit } from '@angular/core';
import { StateService } from '../../providers/state.service';
import { Location } from '../../../../models/location.interface';

interface LocationNode {
  selected: Location;
  selectedValue: string;
  options: Location[];
}

@Component({
  selector: 'bm-location-picker',
  template: `
    <md-select no-underline text-center
        placeholder-hidden
        placeholder="- Select -"
        (change)="selectOnChange(locationNode, $event.value)"
        [ngModel]="locationNode.selectedValue"
        *ngFor="let locationNode of locationArr">
      <md-option 
        *ngFor="let option of locationNode.options" 
        [value]="option.location">
          {{option.locationName}}
      </md-option>
    </md-select>
  `
})
export class LocationPickerCmp implements OnInit {

  public locationArr: LocationNode[] = [];

  constructor(
    private myState: StateService
  ) { }

  public ngOnInit() {
    this.myState.onCurrentLocationChange.subscribe(() => {
      this.locationArr = [];
      this.updateLocationArr(this.myState.currentLocation);
      this.locationArr.reverse();
      if (!!this.myState.currentLocation.subLocations
        && this.myState.currentLocation.subLocations.length) {
          this.locationArr.push({
            selected: null,
            selectedValue: null,
            options: this.myState.currentLocation.subLocations
          });
        }
    });
  }

  public selectOnChange(locationNode: LocationNode, selectedLocation: string) {
    let selectedNode = locationNode.options
      .find((location) => location.location === selectedLocation);
    this.myState.setCurrentLocation(selectedNode, []);
  }

  private updateLocationArr(location: Location) {
    if (!location.parent) { return; }
    this.locationArr.push({
      selected: location,
      selectedValue: location.location,
      options: location.parent.subLocations
    });
    if (!!location.parent.location && location.parent.location !== '.') {
      this.updateLocationArr(location.parent);
    }
  }
}
