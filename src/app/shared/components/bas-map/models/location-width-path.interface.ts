import { Location } from '../../../models/location.interface';

export interface LocationWithPath {
  location: Location;
  path: Location[];
}
