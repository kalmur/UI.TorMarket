import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppState, AuthService } from '@auth0/auth0-angular';
import { RedirectLoginOptions } from '@auth0/auth0-spa-js';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  user$: Observable<any> = this.auth.user$;

  categories: string[] = [];

  constructor() {
    this.categories = [
      'Electronics', 
      'Games', 
      'Toys', 
      'Clothing', 
      'Vehicles', 
      'Pets',
      'Other'
    ]

    this.isAuthenticated$.subscribe(isAuthenticated => {
      console.log('User is authenticated:', isAuthenticated);
    });

    this.user$.subscribe(user => {
      console.log('User profile:', user);
    });
  }

  handleLogin(): void {
    this.auth.loginWithRedirect();
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      }
    });
  }

  handleLogout() {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  handleSell(): void {
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