import { BuildingResolver } from './building-resolver.service';
import { LocationResolver } from './location-resolver.service';
import { ThingResolver } from './thing-resolver.service';

export const RESOLVERS = [LocationResolver, ThingResolver, BuildingResolver];

