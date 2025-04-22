import { Component, OnInit, inject } from '@angular/core';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { IListing } from '../../models/listings';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import { ListingReviewListComponent } from '../../../reviews/components/listing-review-list/listing-review-list.component';
import { IReview } from '../../../reviews/models/reviews';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    CommonModule, 
    NavBarComponent, 
    ListingCardComponent, 
    ListingReviewListComponent
],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss'
})
export class ListingDetailsComponent implements OnInit {
  listing: IListing | null = null;

  private readonly route = inject(ActivatedRoute);
  private readonly listingService = inject(ListingService);

  ngOnInit(): void {
    const listingIdFromUrl = this.route.snapshot.paramMap.get('id');
    if (listingIdFromUrl) {
      this.fetchListingDetails(+listingIdFromUrl);
    }
  }

  private fetchListingDetails(listingId: number): void {
    this.listingService.getListingById(listingId).subscribe({
      next: (listing) => {
        this.listing = listing;
      }
    });
  }
}