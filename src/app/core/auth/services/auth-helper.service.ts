import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isAuthenticated = signal(false);
  user = signal<User | null | undefined>(null);

  constructor() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated.set(isAuthenticated);
    });

    this.authService.user$.subscribe(user => {
      this.user.set(user);
    });
  }

  login(): void {
    this.authService.loginWithRedirect();
  }

  signUp(): void {
    this.authService.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      }
    });
  }

  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  navigateToSellPage(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/sell']);
    } else {
      this.router.navigate(['/auth-prompt'], { 
        queryParams: { 
          action: 'sell' 
        } 
      });
    }
  }
}
