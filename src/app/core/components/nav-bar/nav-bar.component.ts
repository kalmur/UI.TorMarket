import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelperService } from '../../auth/services/auth-helper.service';
import { ListingCategoryService } from '../../../features/categories/services/listing-category.service';
import { ICategory } from '../../models/categories';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent implements OnInit {
  readonly authHelperService = inject(AuthHelperService);
  private readonly userService = inject(UserService);
  private readonly listingCategoryService = inject(ListingCategoryService);
  private readonly router = inject(Router);

  searchTerm = model<string>('');
  categories = model<ICategory[]>([]);
  userListingsNavigation = output<void>();

  private static cachedCategories: ICategory[] = [];

  ngOnInit(): void {
    this.fetchOrReturnCachedCategories();
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
    const user = this.authHelperService.user();

    if (user && user.sub) {
      this.userService.createUserInDatabase(user.sub).subscribe({
        next: (response) => {
          console.log('User created in database:', response);
        }
      });
    }
  }

  private fetchOrReturnCachedCategories(): void {
    if (NavBarComponent.cachedCategories.length > 0) {
      this.categories.set(NavBarComponent.cachedCategories);
      return;
    }
  
    this.listingCategoryService.getAllProductCategories().subscribe({
      next: (response: ICategory[]) => {
        this.categories.set(response);
        NavBarComponent.cachedCategories = response;
      }
    });
  }
}