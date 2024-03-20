import { ProtocolTypes } from 'src/app/shared/constant/global';

export const environment = {
  production: true,
  hostUrl: '#{HostUrl}',
  API_URL: '#{ApiUrl}',
  signInUrl: '#{SignInUrl}',
  registerUrl: '#{RegisterUrl}',
  sessionExpiry: {
    inactivityDelay: 1500, // 1500 Seconds
    countdown: 300, // 300 Seconds
    checkInterval: 1 // second
  },
  timer: {
    autoReturn: 500, // in microsecond = 3 second
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
    current: '#{CurrentVersion}'
  },
  authentication: {
    loginAuthority: '#{Auth.LoginAuthority}',
    clientId: '#{Auth.ClientId}',
    redirectUri: '#{Auth.RedirectUri}',
    postLogoutRedirectUri: '#{Auth.PostLogoutRedirectUri}',
    scope: '#{Auth.Scope}'
  },
  okta: {
    issuer: `${ProtocolTypes.Https}#{OKTA.Issuer}`,
    redirectUri: `#{OKTA.RedirectUri}`, // OKTA app configuration: Login redirect URIs
    clientId: '#{OKTA.ClientId}',  // OKTA app configuration -> Client Credentials: Client ID
    scope: `#{OKTA.Scope}`.split(/\s+/),
    scopes: `#{OKTA.Scope}`,
    pkce: true,
    postLogoutRedirectUri: `${ProtocolTypes.Https}dev-9900302.okta.com/app/UserHome` // Redirect after logout
  },
  application: {
    name: 'eIQC',
    environment: '#{Environment}',
    supportEmail: '#{supportEmail}'
  },
  batchExecution: {
    batchSize: '#{BatchSize}'
  }
};
