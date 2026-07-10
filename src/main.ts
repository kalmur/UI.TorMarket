import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './app/core/auth/interceptors/auth.interceptor';
import { AuthHelperService } from './app/core/auth/services/auth-helper.service';

const appConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      TabsModule.forRoot(),
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthHelperService) => () => auth.whenSessionRestored(),
      deps: [AuthHelperService],
      multi: true,
    }
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
