import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class HomeComponent implements OnInit, OnChanges{
  @Input() title = 'Best sellers';
  @Input() listings: IListing[] = [];
  @Input() categoryName = '';
  @Input() searchTerm = '';

  @Output() searchTermChange = new EventEmitter<string>();

  constructor(
    private readonly listingService: ListingService,
    private readonly authHelperService: AuthHelperService
  ) {}

  ngOnInit(): void {
    this.loadListings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      this.fetchListingsBySearchTerm(this.searchTerm);
    }
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchTermChange.emit(searchTerm);
  }

  onUserListingsNavigation(): void {
    this.fetchListingsByProviderId();
  }

  private loadListings(): void {
    if (this.searchTerm) {
      this.fetchListingsBySearchTerm(this.searchTerm);
    } else if (this.categoryName) {
      this.fetchListingsByCategory(this.categoryName);
    } else {
      this.fetchAllListings();
    }
  }

  private fetchListingsBySearchTerm(searchTerm: string): void {
    this.listingService.getListingBySearchTerm(searchTerm).subscribe({
      next: (listings) => {
        this.listings = listings;
      }
    });
  }

  private fetchListingsByCategory(category: string): void {
    this.listingService.getListingsByCategoryName(category).subscribe({
      next: (listings: IListing[]) => {
        this.listings = listings;
      }
    });
  }

  private fetchListingsByProviderId(): void {
    this.authHelperService.user$.subscribe({
      next: (user) => {
        if (user && user.sub) {
          this.listingService.getListingsByProviderId(user.sub).subscribe({
            next: (listings: IListing[]) => {
              this.listings = listings;
            }
          });
        }
      }
    });
  }

  private fetchAllListings(): void {
    this.listingService.getListings().subscribe({
      next: (response: IListing[]) => {
        this.listings = response;
      }
    });
  }
}
