import { Component, inject } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import { IListing } from '../../models/listings';

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
  listings: IListing[] = [];

  constructor(
    private readonly listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.fetchAllListings();
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
