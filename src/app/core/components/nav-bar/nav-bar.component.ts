import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
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
  private readonly userService = inject(UserService);

  isAuthenticated$: Observable<boolean> = this.auth.isAuthenticated$;
  user$: Observable<User | null | undefined> = this.auth.user$;

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
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        console.log('User is authenticated:', isAuthenticated);
        this.user$.subscribe(user => {
          if (user && user.sub) {
            console.log('User profile:', user);
            console.log('Email:', user.email);
            this.userService.createUserInDatabase(user.sub).subscribe(response => {
              console.log('User entry created in DB:', response);
            }, error => {
              console.error('Error creating user entry in DB:', error);
            });
          }
        }, error => {
          console.error('Error fetching user profile:', error);
        });
      }
    }, error => {
      console.error('Error checking authentication status:', error);
    });
  }

  handleLogin(): void {
    this.auth.loginWithRedirect();
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
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

  handleProfileNavigation(): void {
    this.router.navigate(['/profile']);
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