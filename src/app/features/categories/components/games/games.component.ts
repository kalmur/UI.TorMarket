import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../../../core/components/home/home.component';
import { IListing } from '../../../listings/models/listings';
import { ListingCategoryService } from '../../services/listing-category.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
  categoryName: string = 'Games';
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