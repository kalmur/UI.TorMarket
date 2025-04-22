import { Component, inject, input } from '@angular/core';
import { ListingCardComponent } from '../listing-card/listing-card.component';
import { CommonModule } from '@angular/common';
import { IListing } from '../../models/listings';
import { Router } from '@angular/router';

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
  private readonly router: Router = inject(Router);

  listings = input<IListing[]>([]);

  onViewDetails(listingId: number): void {
    this.router.navigate(['/listing', listingId]);
  }
}
