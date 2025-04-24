import { Component, inject, model, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ListingListComponent } from '../../../features/listings/components/listing-list/listing-list.component';
import { ListingService } from '../../../features/listings/services/listing.service';
import { IListingWithDetails } from '../../../features/listings/models/listings';
import { AuthHelperService } from '../../auth/services/auth-helper.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, ListingListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly listingService = inject(ListingService);
  private readonly authHelperService = inject(AuthHelperService);

  title = model<string>('Best sellers');
  listings = model<IListingWithDetails[]>([]);
  categoryName = model<string>('');
  searchTerm = model<string>('');

  ngOnInit(): void {
    this.loadListings();
  }

  onUserListingsNavigation(): void {
    this.fetchListingsByProviderId();
  }

  private loadListings(): void {
    if (this.searchTerm()) {
      return;
    }
    else if (this.categoryName()) {
      this.fetchListingsByCategoryName(this.categoryName());
    }
    else {
      this.fetchAllListings();
    }
  }

  private async fetchListingsByCategoryName(categoryName: string): Promise<void> {
    const response = await this.listingService.getListingsByCategoryName(categoryName);
    this.listings.set(response);
  }

  private async fetchListingsByProviderId(): Promise<void> {
    const user = this.authHelperService.user();
    if (user && user.sub) {
      const response = await this.listingService.getListingsByProviderId(user.sub);
      this.listings.set(response);
    }
  }

  private async fetchAllListings(): Promise<void> {
    const response = await this.listingService.getListings();
    this.listings.set(response);
  }
}
