import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';
import { ListingCategoryService } from '../../services/listing-category.service';

@Component({
  selector: 'app-clothing',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.scss'
})
export class ClothingComponent implements OnInit {
  categoryName: string = 'Clothing';
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
