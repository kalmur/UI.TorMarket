import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthModule } from '@auth0/auth0-angular';
import { authConfig } from './app/core/auth/config/auth.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      TabsModule.forRoot(),
      AuthModule.forRoot(authConfig),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
    ),
    provideHttpClient(withFetch())
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
