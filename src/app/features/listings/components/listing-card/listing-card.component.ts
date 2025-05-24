import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ListingWithDetails } from '../../models/listings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.scss'
})
export class ListingCardComponent {
  private readonly router = inject(Router);

  listing = input<ListingWithDetails>();

  onViewDetails(): void {
    this.router.navigate(['/listing', this.listing()!.listingId]);
  }
}
