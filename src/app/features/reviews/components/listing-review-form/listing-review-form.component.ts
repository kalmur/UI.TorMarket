import { Component, inject, input } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-listing-review-form',
  standalone: true,
  imports: [],
  templateUrl: './listing-review-form.component.html',
  styleUrl: './listing-review-form.component.scss'
})
export class ListingReviewFormComponent {
  private readonly reviewService = inject(ReviewService);
  private readonly userService = inject(UserService);

  listingId = input<number | null>();
  userId: number | null = null;

  //   this.userId = await this.userService.fetchUserId();
}
