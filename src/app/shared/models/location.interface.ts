

export interface Location {
  location: string;
  locationName: string
  locationLevel: string;
  parent: Location;
  subLocations: Location[];
}
