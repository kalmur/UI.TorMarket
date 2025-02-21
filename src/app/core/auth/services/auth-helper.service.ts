import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  user$: Observable<any> = this.auth.user$;

  constructor() { }

  login(): void {
    this.auth.loginWithRedirect();
  }

  signUp(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      }
    });
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  navigateToSellPage(): void {
    this.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/sell']);
      } else {
        this.router.navigate(['/auth-prompt'], { 
          queryParams: { 
            action: 'sell a product' 
          } 
        });
      }
    });
  }
}
