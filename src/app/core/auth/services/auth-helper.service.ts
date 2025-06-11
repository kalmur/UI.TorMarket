import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  user = signal<User | null | undefined>(null);
  isAuthenticated = signal(false);

  constructor() {
    this.subscribeToAuthState();
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

  // Private methods
  private subscribeToAuthState(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isAuthenticated.set(isAuthenticated);
        this.fetchAccessToken();
      }
    });

    this.authService.user$.subscribe(user => {
      this.user.set(user);
    });
  }

  private async fetchAccessToken(): Promise<void> {
    try {
      const token = await firstValueFrom(this.authService.getAccessTokenSilently());
      if (token) {
        sessionStorage.setItem('access_token', token);
      }
    } catch {
      sessionStorage.removeItem('access_token');
    }
  }
}
