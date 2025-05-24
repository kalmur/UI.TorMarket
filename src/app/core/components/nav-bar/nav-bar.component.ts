import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelperService } from '../../auth/services/auth-helper.service';
import { ListingCategoryService } from '../../../features/categories/services/listing-category.service';
import { Category } from '../../models/categories';
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

  private static cachedCategories: Category[] = [];

  searchTerm = model<string>('');
  categories = model<Category[]>([]);

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
    this.router.navigate(['/profile/listings']);
  }

  handleSearchEvent(): void {
    if (!this.searchTerm().trim()) {
      this.router.navigate(['/']);
      return;
    }

    this.router.navigate(['/search', this.searchTerm()]);
  }

  async createUserInDatabase(): Promise<void> {
    const user = this.authHelperService.user();
    if (user && user.sub) {
      await this.userService.createUserInDatabase(user.sub);
    }
  }

  private async fetchOrReturnCachedCategories(): Promise<void> {
    if (NavBarComponent.cachedCategories.length > 0) {
      this.categories.set(NavBarComponent.cachedCategories);
      return;
    }

    const response = await this.listingCategoryService.getAllListingCategories();
    NavBarComponent.cachedCategories = response;
    this.categories.set(response);
  }
}