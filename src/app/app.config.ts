import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(),
    provideAuth0({
      domain: 'kalmardev.uk.auth0.com',
      clientId: 's95GLW4dxcC3lSUGparjRccI2KfF7Zwv',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};
