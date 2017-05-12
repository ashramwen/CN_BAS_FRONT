import { Component, Input, Output } from '@angular/core';
import { LayerSelector } from '../../../providers/layer-selector.service';
import { Location } from '../../../../../models/location.interface';

@Component({
  selector: 'bm-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorCmp {
  @Input() public locations: Location[];

  constructor(
    private layerSelector: LayerSelector,
  ) { }

  public remove(location: Location) {
    this.layerSelector.deselectLocation(location);
  }
}
