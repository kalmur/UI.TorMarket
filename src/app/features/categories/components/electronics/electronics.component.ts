import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';
import { ListingCategoryService } from '../../services/listing-category.service';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.scss'
})
export class ElectronicsComponent implements OnInit {
  categoryName: string = 'Electronics';
  listings: IListing[] = [];
  
  constructor(
    private readonly listingCategoryService: ListingCategoryService,
  ) {}

  ngOnInit(): void {
    this.fetchListingsByCategory(this.categoryName);
  }

  private fetchListingsByCategory(category: string): void {
    this.listingCategoryService.getListingsByCategoryId(category).subscribe({
      next: (listings: IListing[]) => {
        this.listings = listings;
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      }
    });
  }
}
