import { Component } from '@angular/core';
import { ListingReviewCardComponent } from '../listing-review-card/listing-review-card.component';
import { IReview } from '../../models/reviews';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-review-list',
  standalone: true,
  imports: [CommonModule, ListingReviewCardComponent],
  templateUrl: './listing-review-list.component.html',
  styleUrl: './listing-review-list.component.scss'
})
export class ListingReviewListComponent {
  reviews: IReview[] = [
    { value: 5, comment: 'Amazing product!' },
    { value: 4, comment: 'Very good, but could be improved.' },
    { value: 3, comment: 'Average experience.' },
    { value: 3, comment: 'Average experience.' }
  ];
}
