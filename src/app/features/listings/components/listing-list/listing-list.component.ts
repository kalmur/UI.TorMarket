import { Component, inject, Input } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import { IListing } from '../../models/listings';
import { ListingCategoryService } from '../../../categories/services/listing-category.service';

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
  @Input() categoryName: string = '';

  listings: IListing[] = [];

  constructor(
    private readonly listingService: ListingService,
    private readonly listingCategoryService: ListingCategoryService
  ) {}

  ngOnInit(): void {
    if (this.categoryName) {
      this.fetchListingsByCategory(this.categoryName);
    } else {
      this.fetchAllListings();
    }
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

  private fetchListingsByCategory(category: string): void {
    this.listingCategoryService.getListingsByCategory(category).subscribe({
      next: (listings) => {
        this.listings = listings;
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      }
    });
  }
}
