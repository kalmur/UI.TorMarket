import { Component, inject, model, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../models/listings';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-searched-listings',
  standalone: true,
  imports: [
    HomeComponent
  ],
  templateUrl: './searched-listings.component.html',
  styleUrls: ['./searched-listings.component.scss']
})
export class SearchedListingsComponent implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly listingService: ListingService = inject(ListingService);

  searchTerm = model<string>('');
  listings = model<IListing[]>([]); 

  title = 'Searched Listings';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.searchTerm.set(params['searchTerm']);
        this.fetchListingsBySearchTerm(this.searchTerm());
      }
    });
  }

  private async fetchListingsBySearchTerm(searchTerm: string): Promise<void> {
    if (searchTerm) {
      const response = await this.listingService.getListingBySearchTerm(searchTerm);
      this.listings.set(response);
    }
  }
}