import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthHelperService } from '../services/auth-helper.service';
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authHelper = inject(AuthHelperService);
  const token = authHelper.accessToken();

  if (token && req.url.startsWith(environment.apiBaseUrl)) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  }

  return next(req);
};
