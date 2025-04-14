import { Component, Input, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ListingListComponent } from '../../../features/listings/components/listing-list/listing-list.component';
import { ListingService } from '../../../features/listings/services/listing.service';
import { IListing } from '../../../features/listings/models/listings';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, ListingListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  @Input() title: string = 'Best sellers';
  @Input() listings: any[] = [];
  @Input() categoryName: string = '';
  @Input() searchTerm: string = '';

  constructor(
    private readonly listingService: ListingService
  ) {}

  ngOnInit(): void {
    if(!(this.categoryName || this.searchTerm)){
      this.fetchAllListings();
    }
  }

  onSearchTermChange(term: string): void {
    this.searchTerm = term;
  }

  private fetchAllListings(): void {
    this.listingService.getAllListings().subscribe({
      next: (response: IListing[]) => {
        this.listings = response;
      },
      error: (error) => {
        console.error('Failed to fetch listings:', error);
      }
    });
  }
}
