import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  // This is for local development only - to be replaced with a proper URL in production
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
    return this.listingEndpoint;
  }

  get getListingById(): (id: number) => string {
    return (id: number) => 
      `${this.listingEndpoint}/id/${id}`;
  }

  get getListingsByCategoryName(): (categoryName: string) => string {
    return (category: string) => 
      `${this.listingEndpoint}/category/${encodeURIComponent(category)}`;
  }

  get getListingBySearchTerm(): (searchTerm: string) => string {
    return (searchTerm: string) => 
      `${this.listingEndpoint}/name/${encodeURIComponent(searchTerm)}`;
  }

  get getListingsByProviderId(): (providerId: string) => string {
    return (providerId: string) => 
      `${this.listingEndpoint}/user/${providerId}`;
  }

  // Categories
  get getAllListingCategories(): string {
    return this.listingCategoryEndpoint;
  }

  get getListingCategoryByName(): string {
    return this.listingCategoryEndpoint + '/name';
  }
}
