import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import { IListing } from '../../models/listings';
import { ListingCategoryService } from '../../../categories/services/listing-category.service';
import { SearchService } from '../../../../core/services/search.service';

@Component({
  selector: 'app-listing-list',
  standalone: true,
  imports: [
    ListingCardComponent, 
    CommonModule
  ],
  templateUrl: './listing-list.component.html',
  styleUrl: './listing-list.component.scss'
})
export class ListingListComponent {
  @Input() listings: IListing[] = [];
  @Input() searchTerm: string = '';
  @Input() categoryName: string = '';

  constructor(
    private readonly listingService: ListingService,
    private readonly listingCategoryService: ListingCategoryService,
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    if (this.categoryName) {
      this.fetchListingsByCategory(this.categoryName);
    } else {
      this.fetchAllListings();
    }
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

  private getListingsBySearchTerm(searchTerm: string): void {
    this.searchService.getListingBySearchTerm(searchTerm).subscribe({
      next: (response: IListing[]) => {
        this.listings = response;
      },
      error: (error: any) => {
        console.error('Failed to fetch listings:', error);
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
