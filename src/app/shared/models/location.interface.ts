
export type LocationLevel = undefined | 'building' | 'floor' | 'partition' | 'area' | 'site';

export interface Location {
  location: string;
  locationName: string;
  locationLevel: LocationLevel;
  parent: Location;
  fullName: string;
  subLocations: Location[];
}
