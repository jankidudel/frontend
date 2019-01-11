import {InjectionToken} from '@angular/core';
import {environment} from '../environments/environment';

export let APP_CONFIG = new InjectionToken('app.config');

export interface IAppConfig {
    apiEndpoint: string;
    javaApiEndpoint: string;
    whitelistedDomains: string[];
}

let apiEndpoint = '';
const javaApiEndpoint = 'http://company.java.api.joberate.com/';
const whitelistedDomains = [
    'capi.site', 'company.api.joberate.com', 'company.java.api.joberate.com'
];

if (environment.production) {
    apiEndpoint = 'http://company.api.company.com/api/';
} else {
    apiEndpoint = 'http://capi.site/api/';
}


export const AppConfig: IAppConfig = {
    apiEndpoint: apiEndpoint,
    javaApiEndpoint: javaApiEndpoint,
    whitelistedDomains: whitelistedDomains
};
