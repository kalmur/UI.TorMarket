import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../../core/services/search.service';
import { IListing } from '../../models/listings';
import { NavBarComponent } from '../../../../core/components/nav-bar/nav-bar.component';
import { ListingListComponent } from '../listing-list/listing-list.component';

@Component({
  selector: 'app-searched-listings',
  standalone: true,
  imports: [
    NavBarComponent,
    ListingListComponent
  ],
  templateUrl: './searched-listings.component.html',
  styleUrls: ['./searched-listings.component.scss']
})
export class SearchedListingsComponent implements OnInit {
  title: string = 'Search Results';
  searchTerm: string = '';
  categoryName: string = '';
  listings: IListing[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route Params:', params);
      this.searchTerm = params['searchTerm'] || '';
      console.log('Search Term in SearchedListingsComponent:', this.searchTerm);
  
      // Fetch listings whenever the searchTerm changes
      if (this.searchTerm) {
        this.fetchListingsBySearchTerm(this.searchTerm);
      }
    });
  }

  private fetchListingsBySearchTerm(searchTerm: string): void {
    this.searchService.getListingBySearchTerm(searchTerm).subscribe({
      next: (listings) => {
        this.listings = listings;
        console.log(this.listings);
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
  }
}
