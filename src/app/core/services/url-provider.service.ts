import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  private readonly baseUrl = 'http://localhost:5261/api';

  private readonly userEndpoint = `${this.baseUrl}/users`;
  private readonly listingEndpoint = `${this.baseUrl}/listings`;
  private readonly listingCategoryEndpoint = `${this.baseUrl}/categories`;

  // Users
  get createUser(): string {
    return this.userEndpoint;
  }

  // Listings
  get createListing(): string {
    return this.listingEndpoint;
  }

  get getListings(): string {
    return this.listingEndpoint + '/all';
  }

  get getListingsByCategoryName(): (categoryName: string) => string {
    return (category: string) => 
      `${this.listingEndpoint}?category=${encodeURIComponent(category)}`;
  }

  get getListingBySearchTerm(): (searchTerm: string) => string {
    return (searchTerm: string) => 
      `${this.listingEndpoint}/${encodeURIComponent(searchTerm)}`;
  }

  // Categories
  get getAllListingCategories(): string {
    return this.listingCategoryEndpoint + '/all';
  }

  get getListingCategoryByName(): string {
    return this.listingCategoryEndpoint + '/name';
  }
}
