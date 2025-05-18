import { Component, inject, input, model, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ListingListComponent } from '../../../features/listings/components/listing-list/listing-list.component';
import { ListingService } from '../../../features/listings/services/listing.service';
import { IListingWithDetails } from '../../../features/listings/models/listings';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent, 
    FooterComponent,
    ListingListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly listingService = inject(ListingService);

  title = model<string>('Best sellers');
  listings = model<IListingWithDetails[]>([]);
  searchTerm = model<string>('');
  categoryName = input<string>('');

  ngOnInit(): void {
    if (this.title() === 'Best sellers') {
      this.fetchAllListings();
    } else if (this.categoryName()) {
      this.fetchListingsByCategoryName(this.categoryName());
    } return;
  }

  private async fetchAllListings(): Promise<void> {
    const response = await this.listingService.getListings();
    this.listings.set(response);
  }

  private async fetchListingsByCategoryName(categoryName: string): Promise<void> {
    const response = await this.listingService.getListingsByCategoryName(categoryName);
    this.listings.set(response);
  }
}
