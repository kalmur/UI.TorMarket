import { Component, OnInit, inject } from '@angular/core';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { IListingWithDetails } from '../../models/listings';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import { ListingReviewListComponent } from '../../../reviews/components/listing-review-list/listing-review-list.component';
import { FooterComponent } from '../../../../core/components/footer/footer.component';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [
    CommonModule, 
    NavBarComponent, 
    ListingCardComponent, 
    ListingReviewListComponent,
    FooterComponent
],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss'
})
export class ListingDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly listingService = inject(ListingService);

  listing: IListingWithDetails | null = null;

  ngOnInit(): void {
    const listingIdFromUrl = this.route.snapshot.paramMap.get('id');
    if (listingIdFromUrl) {
      this.fetchListingDetails(+listingIdFromUrl);
    }
  }

  private async fetchListingDetails(listingId: number): Promise<void> {
    const listing = await this.listingService.getListingById(listingId);
    this.listing = listing;
  }
}