import { BMLocation } from './location.interface';

export interface BasArea extends L.Polygon {
  location?: BMLocation;
}
