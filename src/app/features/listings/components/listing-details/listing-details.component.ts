import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { IListing } from '../../models/listings';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../services/listing.service';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-details',
  standalone: true,
  imports: [CommonModule, NavBarComponent, ListingCardComponent],
  templateUrl: './listing-details.component.html',
  styleUrl: './listing-details.component.scss'
})
export class ListingDetailsComponent implements OnInit {
  listing: IListing | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly listingService: ListingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchListingDetails(+id);
    }
  }

  private fetchListingDetails(id: number): void {
    this.listingService.getListingById(id).subscribe({
      next: (listing) => {
        this.listing = listing;
      }
    });
  }
}
