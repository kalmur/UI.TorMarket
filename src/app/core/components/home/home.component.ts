import { Component, Input, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ListingListComponent } from '../../../features/listings/components/listing-list/listing-list.component';
import { ListingService } from '../../../features/listings/services/listing.service';
import { IListing } from '../../../features/listings/models/listings';
import { ListingCategoryService } from '../../../features/categories/services/listing-category.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, ListingListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  @Input() title: string = 'Best sellers';
  @Input() listings: any[] = [];
  @Input() categoryName: string = '';
  @Input() searchTerm: string = '';

  constructor(
    private readonly listingService: ListingService,
    private readonly listingCategoryService: ListingCategoryService,
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (this.searchTerm) {
      this.fetchListingsBySearchTerm(this.searchTerm);
    } else if (this.categoryName) {
      this.fetchListingsByCategory(this.categoryName);
    } else {
      this.fetchAllListings();
    }
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term;
  }

  private fetchListingsBySearchTerm(searchTerm: string): void {
    this.searchService.getListingBySearchTerm(searchTerm).subscribe({
      next: (listings) => {
        this.listings = listings;
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
  }

  private fetchListingsByCategory(category: string): void {
    this.listingCategoryService.getListingsByCategoryId(category).subscribe({
      next: (listings: IListing[]) => {
        this.listings = listings;
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      }
    });
  }

  private fetchAllListings(): void {
    this.listingService.getAllListings().subscribe({
      next: (response: IListing[]) => {
        this.listings = response;
      },
      error: (error) => {
        console.error('Failed to fetch listings:', error);
      }
    });
  }
}
