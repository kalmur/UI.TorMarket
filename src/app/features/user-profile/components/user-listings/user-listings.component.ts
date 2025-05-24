import { Component, inject, model, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { ListingWithDetails } from '../../../listings/models/listings';
import { ListingService } from '../../../listings/services/listing.service';
import { AuthHelperService } from '../../../../core/auth/services/auth-helper.service';

@Component({
  selector: 'app-user-listings',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './user-listings.component.html',
  styleUrl: './user-listings.component.scss'
})
export class UserListingsComponent implements OnInit {
  private readonly listingService = inject(ListingService);
  private readonly authHelperService = inject(AuthHelperService);

  listings = model<ListingWithDetails[]>([]); 

  title = 'My listings';

  ngOnInit(): void {
    const user = this.authHelperService.user();
    if (user && user.sub) {
      this.fetchListingsByProviderId(user.sub);
    } else {
      this.title = 'User not found'; 
    }
  }

  private async fetchListingsByProviderId(providerId: string): Promise<void> {
    const response = await this.listingService.getListingsByProviderId(providerId);
    if (response && response.length > 0) {
      this.listings.set(response);
    } else {
      this.title = 'No listings found';
      this.listings.set([]);
    }
  }
}