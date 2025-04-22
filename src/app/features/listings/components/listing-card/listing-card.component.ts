import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { IListing } from '../../models/listings';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.scss'
})
export class ListingCardComponent {
  listing = input<IListing>();
  listingDetailsRequested = output<number>();

  onViewDetails(): void {
    this.listingDetailsRequested.emit(
      this.listing()!.listingId
    );
  }
}
