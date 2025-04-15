import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ListingListComponent } from '../../../features/listings/components/listing-list/listing-list.component';
import { ListingService } from '../../../features/listings/services/listing.service';
import { IListing } from '../../../features/listings/models/listings';
import { ListingCategoryService } from '../../../features/categories/services/listing-category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, ListingListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnChanges{
  @Input() title: string = 'Best sellers';
  @Input() listings: IListing[] = [];
  @Input() categoryName: string = '';
  @Input() searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();

  constructor(
    private readonly listingService: ListingService,
    private readonly listingCategoryService: ListingCategoryService
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
    this.listingCategoryService.getListingsByCategoryId(category).subscribe({
      next: (listings: IListing[]) => {
        this.listings = listings;
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
