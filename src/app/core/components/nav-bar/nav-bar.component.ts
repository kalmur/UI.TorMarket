import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHelperService } from '../../auth/services/auth-helper.service';
import { Observable } from 'rxjs';
import { ListingCategoryService } from '../../../features/categories/services/listing-category.service';
import { ICategory } from '../../models/categories';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent implements OnInit {
  @Output() searchTermChange = new EventEmitter<string>();

  categories: ICategory[] = []; 

  isAuthenticated$: Observable<boolean> = this.authHelperService.isAuthenticated$;
  user$: Observable<any> = this.authHelperService.user$;

  constructor(
    private readonly authHelperService: AuthHelperService,
    private readonly listingCategoryService: ListingCategoryService,
    private readonly searchService: SearchService,
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

  handlerSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      return;
    }

    this.searchTermChange.emit(searchTerm);
  
    this.searchService.getListingBySearchTerm(searchTerm).subscribe({
      next: () => {
        this.router.navigate(['/search'], { queryParams: { query: searchTerm } });
        console.log('Search successful:', searchTerm);
      },
      error: (error) => {
        console.error('Search failed:', error);
      }
    });
  }

  private fetchAllCategories(): void {
    this.listingCategoryService.getAllProductCategories().subscribe({
      next: (response: ICategory[]) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Failed to fetch categories:', error);
      }
    });
  }
}