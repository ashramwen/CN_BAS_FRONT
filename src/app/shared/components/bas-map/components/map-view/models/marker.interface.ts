import { Location } from '../../../../../models/location.interface';
import { Thing } from '../../../../../models/thing.interface';

export interface BasMarker extends L.Marker {
  device?: Thing;
}
