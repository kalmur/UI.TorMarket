import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelperService } from '../../auth/services/auth-helper.service';
import { Observable } from 'rxjs';
import { ListingCategoryService } from '../../../features/categories/services/listing-category.service';
import { ICategory } from '../../models/categories';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent implements OnInit {
  @Input() searchTerm: string = '';

  @Output() searchTermChange = new EventEmitter<string>();
  @Output() userListingsNavigation = new EventEmitter<void>();

  isAuthenticated$: Observable<boolean> = this.authHelperService.isAuthenticated$;
  user$: Observable<any> = this.authHelperService.user$;

  categories: ICategory[] = []; 

  constructor(
    private readonly authHelperService: AuthHelperService,
    private readonly listingCategoryService: ListingCategoryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAllCategories();
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

  handleSell(): void {
    this.authHelperService.navigateToSellPage();
  }

  handleProfileNavigation(): void {
    this.router.navigate(['/profile']);
  }

  handleUserListingsNavigation(): void {
    this.userListingsNavigation.emit();
    this.router.navigate(['/profile/listings']);
  }

  handleSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      return;
    }
  
    this.searchTermChange.emit(searchTerm);
    this.router.navigate(['/search', searchTerm]);
  }

  private fetchAllCategories(): void {
    this.listingCategoryService.getAllProductCategories().subscribe({
      next: (response: ICategory[]) => {
        this.categories = response;
      }
    });
  }
}