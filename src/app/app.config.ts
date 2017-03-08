import { OpaqueToken } from '@angular/core';

export const AppConfigToken = new OpaqueToken('Config');

export interface AppConfig {
    cloudUrl: string;
    wsUrl: string;
    siteUrl: string;
    kiiAppID: string;
    thirdPartyAPIUrl: string;
}

export const BASE_CONFIG = require('../assets/config.json');