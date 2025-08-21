import { environment } from "../../../../environments/environment";

export const authConfig = {
  domain: environment.auth.domain,
  clientId: environment.auth.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: 'https://tormarket.com/api'
  }
};