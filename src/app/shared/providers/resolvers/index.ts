import { BuildingResolver } from './building-resolver.service';
import { LightResolver } from './light-resolver.service';
import { LocationResolver } from './location-resolver.service';

export const RESOLVERS = [LocationResolver, LightResolver, BuildingResolver];
