import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, model, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelperService } from '../../auth/services/auth-helper.service';
import { Observable } from 'rxjs';
import { ListingCategoryService } from '../../../features/categories/services/listing-category.service';
import { ICategory } from '../../models/categories';
import { FormsModule } from '@angular/forms';
import { User } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent implements OnInit {
  searchTerm = model<string>('');

  @Output() userListingsNavigation = new EventEmitter<void>();

  isAuthenticated = false;
  categories: ICategory[] = []; 

  private static cachedCategories: ICategory[] = [];

  private readonly authHelperService: AuthHelperService = inject(AuthHelperService);
  private readonly userService: UserService = inject(UserService);
  private readonly listingCategoryService: ListingCategoryService = inject(ListingCategoryService);
  private readonly router: Router = inject(Router);

  user$: Observable<User | null | undefined> = this.authHelperService.user$;
  isAuthenticated$: Observable<boolean> = this.authHelperService.isAuthenticated$;

  ngOnInit(): void {
    this.fetchOrReturnCachedCategories();
    this.checkUsersAuthenticationStatus();
  }

  handleLogin(): void {
    this.authHelperService.login();
  }

  handleSignUp(): void {
    this.authHelperService.signUp();
  }

  handleLogout(): void {
    this.authHelperService.logout();
  }

  handleSellNavigation(): void {
    this.authHelperService.navigateToSellPage();
  }

  handleProfileNavigation(): void {
    this.router.navigate(['/profile']);
  }

  handleUserListingsNavigation(): void {
    this.userListingsNavigation.emit();
    this.router.navigate(['/profile/listings']);
  }

  handleSearchEvent(): void {
    const searchTerm = this.searchTerm();
    if (!searchTerm.trim()) {
      return;
    }

    this.router.navigate(['/search', searchTerm]);
  }

  createUserInDatabase(): void {
    this.user$.subscribe((user) => {
      if (user && user.email) {
        this.userService.createUserInDatabase(user.sub).subscribe({
          next: (response) => {
            console.log('User created in database:', response);
          }
        });
      }
    });
  }

  private checkUsersAuthenticationStatus(): void {
    this.authHelperService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });
  }

  private fetchOrReturnCachedCategories(): void {
    if (NavBarComponent.cachedCategories.length > 0) {
      this.categories = NavBarComponent.cachedCategories;
      return;
    }
  
    this.listingCategoryService.getAllProductCategories().subscribe({
      next: (response: ICategory[]) => {
        this.categories = response;
        NavBarComponent.cachedCategories = response;
      }
    });
  }
}