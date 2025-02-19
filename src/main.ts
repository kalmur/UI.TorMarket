import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthModule } from '@auth0/auth0-angular';
import { authConfig } from './app/core/auth/config/auth.config';
import { HttpClientModule } from '@angular/common/http';

const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      TabsModule.forRoot(),
      AuthModule.forRoot(authConfig),
      HttpClientModule
    )
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
