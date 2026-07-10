import { environment } from '../../../../environments/environment';

export const authConfig = {
  authorizeUrl: environment.auth.authorizeUrl,
  logoutUrl: environment.auth.logoutUrl,
  clientId: environment.auth.clientId,
  redirectUri: environment.auth.redirectUri,
  audience: environment.auth.audience,
  scope: environment.auth.scope,
};