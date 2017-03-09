

export interface Location {
  location: string;
  locationLevel: string;
  subLocations: { [subLocation: string]: Location };
}
