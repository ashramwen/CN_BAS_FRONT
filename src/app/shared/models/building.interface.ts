export interface GeoJSON {
  type: 'FeatureCollection';
  features: FeatureJSON[];
}

export interface FeatureJSON {
  type: 'Feature';
  id: string;
  properties: Object;
  geometry: {
    type: 'LineString' | 'Polygon' | 'Point';
    coordinates?: Array<[number, number]> | Array<Array<[number, number]>>;
    coordinate?: [number, number];
  };
}

// level refers to index of building.levels from GET /map/buildings
export interface WallFeature extends FeatureJSON {
  properties: {
    type: 'wall';
    level: number;
  };
  geometry: {
    type: 'Polygon';
    coordinates: Array<[number, number]>;
  };
}

export interface AreaFeature extends FeatureJSON {
  properties: {
    id: string;
    tag: string;
    type: 'floor';
    level: number;
    role: 'building' | 'level'
    | 'partition' | 'area' | 'site'; // eg. floor, room, position, area, position
    parentID: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: Array<Array<[number, number]>>;
  };
}

interface DeviceFeature extends FeatureJSON {
  properties: {
    type: 'device';
    level: number;
    id: string;
    deviceType: string;
    areaID: string // bind to area
  };
  geometry: {
    type: 'Point';
    coordinate: [number, number];
  };
}

interface BuildingGeoJSON extends GeoJSON {
  features: Array<WallFeature | AreaFeature>;
}

export interface Building {
  id: string;
  data: BuildingGeoJSON;
  levels: Array<{ name: string }>; // from bottom to top
}
