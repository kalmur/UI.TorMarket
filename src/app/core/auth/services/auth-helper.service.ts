import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  user$: Observable<User | null | undefined> = this.auth.user$;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

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
            action: 'sell' 
          } 
        });
      }
    });
  }
}
