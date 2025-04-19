import { Component, Input } from '@angular/core';
import { IReview } from '../../models/reviews';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-listing-review-card',
  standalone: true,
  imports: [RatingModule],
  templateUrl: './listing-review-card.component.html',
  styleUrl: './listing-review-card.component.scss'
})
export class ListingReviewCardComponent {
  @Input() review: IReview = {
    value: 0,
    comment: 'TestCommentByLad'
  };
}
