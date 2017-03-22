import { BuildingResolver } from './building-resolver.service';
import { LightsResolver } from './lights-resolver.service';
import { LocationResolver } from './location-resolver.service';

export const RESOLVERS = [LocationResolver, LightsResolver, BuildingResolver];
