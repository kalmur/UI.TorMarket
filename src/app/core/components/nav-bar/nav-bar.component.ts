import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;

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
  }

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/sell',
      },
    });
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/sell',
      },
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
}