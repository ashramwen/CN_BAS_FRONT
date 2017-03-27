import { Location } from '../../models/location.interface';
import { LocationWithPath } from './models/location-width-path.interface';

export class MapUtils {
  public static addClass(layer: L.Polygon, name: string) {
    let ele = layer.getElement();
    if (!ele.classList.contains(name)) {
      ele.classList.add(name);
    }
  }

  public static removeClass(layer: L.Polygon, name: string) {
    let ele = layer.getElement();
    if (ele.classList.contains(name)) {
      ele.classList.remove(name);
    }
  }

  public static findLocation(
    location: string,
    locationNode: Location,
  ): Location {
    if (locationNode.location === location) {
      return locationNode;
    }
    for (let subNode of locationNode.subLocations) {
      let result = MapUtils.findLocation(location, subNode);
      if (result) {
        return result;
      }
    }
  }

  public static findLocationWithPath(
    location: string,
    locationNode: Location,
    path: Location[]
  ): LocationWithPath {
    if (locationNode.location === location) {
      return {
        location: locationNode,
        path
      };
    }
    for (let subNode of locationNode.subLocations) {
      let result = MapUtils.findLocationWithPath(location, subNode, path.concat([subNode]));
      if (result) {
        return result;
      }
    }
  }
}
