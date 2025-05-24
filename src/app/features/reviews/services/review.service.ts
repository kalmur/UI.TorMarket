import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { CreateReviewRequest } from '../models/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly httpClient = inject(HttpClient);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly toastr = inject(ToastrService);

  async createListingReview(review: CreateReviewRequest) : Promise<void> {
    const endpoint = this.urlProvider.createListingReview;

    return await firstValueFrom(
      this.httpClient.post<void>(endpoint, review)
    ).catch((error) => {
        this.toastr.error('Failed to get listings');
        throw error;
      }
    );
  }
}
