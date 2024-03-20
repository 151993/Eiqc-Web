// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environments, ProtocolTypes } from 'src/app/shared/constant/global';

export const webUrl = 'http://localhost:4200/';

export const environment = {
  production: false,
  hostUrl: webUrl,
  API_URL: 'https://api-dev.eiqc.jabilapps.com/',
  signInUrl: 'https://jblpartners.oktapreview.com/home/bookmark/0oa12cbous69AgVuu0h8/1280',
  registerUrl: 'https://partnersdev.jabil.com/signin/register',
  sessionExpiry: {
    inactivityDelay: 1500, // 1500 Seconds
    countdown: 300, // 300 Seconds
    checkInterval: 1 // second
  },
  timer: {
    autoReturn: 500, // in microsecond
    expirationTime: 5000,
    expirationTimeError: 15000,
    filterTimer: 100,
    debounceTimer: 250
  },
  limit: {
    maxResult: 10,
    recentMaxResult: 5
  },
  domain: {
    CookieDomain: ''
  },
  version: {
    current: '0.1.0'
  },
  authentication: {
    loginAuthority: 'https://auth-dev.eiqc.jabilapps.com',
    clientId: 'eIQC_Angular_Local',
    redirectUri: 'http://localhost:4200/auth-callback',
    postLogoutRedirectUri: 'https://jabildev.oktapreview.com/app/UserHome',
    scope: 'openid profile email role samAccount userId eIQC_API_LOCAL'
  },
  okta: {
    issuer: `${ProtocolTypes.Https}dev-9900302.okta.com/oauth2/default`,
    redirectUri: `${webUrl}auth-callback`, // OKTA app configuration: Login redirect URIs
    clientId: '0oa2tdlecwKFavh7t5d6',  // OKTA app configuration -> Client Credentials: Client ID
    scope: `openid profile email`.split(/\s+/),
    scopes: `openid profile email`,
    pkce: true,
    postLogoutRedirectUri: `${ProtocolTypes.Https}dev-9900302.okta.com/app/UserHome`// Redirect after logout
  },
  application: {
    name: 'eIQC',
    environment: Environments.Local,
    supportEmail: 'sandip_patil2@Jabil.com'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
