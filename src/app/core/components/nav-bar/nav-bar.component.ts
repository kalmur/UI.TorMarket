import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelperService } from '../../auth/services/auth-helper.service';
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
  private readonly authHelper = inject(AuthHelperService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  isAuthenticated$: Observable<boolean> = this.authHelper.isAuthenticated$;
  user$: Observable<any> = this.authHelper.user$;
  
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
    this.authHelper.login();
  }

  handleSignUp(): void {
    this.authHelper.signUp();
  }

  handleLogout(): void {
    this.authHelper.logout();
  }

  handleSell(): void {
    this.authHelper.navigateToSellPage();
  }

  handleProfileNavigation(): void {
    this.router.navigate(['/profile']);
  }
}