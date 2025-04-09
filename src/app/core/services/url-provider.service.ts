import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  private readonly baseUrl = 'http://localhost:5261/api';

  private readonly userEndpoint = `${this.baseUrl}/users`;
  private readonly listingEndpoint = `${this.baseUrl}/listings`;
  private readonly listingCategoryEndpoint = `${this.baseUrl}/listings/categories`;

  // Users
  get createUser(): string {
    return this.userEndpoint;
  }

  // Listings
  get createListing(): string {
    return this.listingEndpoint;
  }

  get getAllListings(): string {
    return this.listingEndpoint + '/all';
  }

  // Listing categories
  get getAllListingCategories(): string {
    return this.listingCategoryEndpoint + '/all';
  }

  get getListingCategoryByName(): string {
    return this.listingCategoryEndpoint + '/name';
  }
}
