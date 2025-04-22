import { Component, inject, model, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ListingListComponent } from '../../../features/listings/components/listing-list/listing-list.component';
import { ListingService } from '../../../features/listings/services/listing.service';
import { IListing } from '../../../features/listings/models/listings';
import { AuthHelperService } from '../../auth/services/auth-helper.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, ListingListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title = model<string>('Best sellers');
  listings = model<IListing[]>([]);
  categoryName = model<string>('');
  searchTerm = model<string>('');

  private readonly listingService: ListingService = inject(ListingService);
  private readonly authHelperService: AuthHelperService = inject(AuthHelperService);

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

  private fetchListingsByCategoryName(categoryName: string): void {
    this.listingService.getListingsByCategoryName(categoryName).subscribe({
      next: (response: IListing[]) => {
        this.listings.set(response);
      }
    });
  }

  private fetchListingsByProviderId(): void {
    this.authHelperService.user$.subscribe({
      next: (user) => {
        if (user && user.sub) {
          const providerId = user.sub;
          this.listingService.getListingsByProviderId(providerId).subscribe({
            next: (response: IListing[]) => {
              this.listings.set(response);
            }
          });
        }
      }
    });
  }

  private fetchAllListings(): void {
    this.listingService.getListings().subscribe({
      next: (response: IListing[]) => {
        this.listings.set(response);
      }
    });
  }
}
