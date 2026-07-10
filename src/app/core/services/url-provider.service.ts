import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  // This is for local development only - to be replaced with a proper URL in production
  private readonly baseUrl_v1 = 'http://localhost:5000/api/v1';

  private readonly userEndpoint = `${this.baseUrl_v1}/users`;
  private readonly listingEndpoint = `${this.baseUrl_v1}/listings`;
  private readonly listingCategoryEndpoint = `${this.baseUrl_v1}/categories`;
  private readonly blobEndpoint = `${this.baseUrl_v1}/blobs`;
  private readonly reviewEndpoint = `${this.baseUrl_v1}/reviews`;
  private readonly authEndpoint = `${this.baseUrl_v1}/auth`;

  // Auth
  get authExchangeCode(): string {
    return `${this.authEndpoint}/token`;
  }

  get authRefresh(): string {
    return `${this.authEndpoint}/refresh`;
  }

  get authLogout(): string {
    return `${this.authEndpoint}/logout`;
  }

  // Users
  get createUser(): string {
    return this.userEndpoint;
  }

  get getAllUsers(): string {
    return this.userEndpoint;
  }

  get getUserByProviderId(): (providerId: string) => string {
    return (providerId: string) => 
      `${this.userEndpoint}/${providerId}`;
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
      `${this.listingEndpoint}/${id}`;
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

  get updateListingBlobUrls(): (listingId: number) => string {
    return (listingId: number) => 
      `${this.listingEndpoint}/blob/${listingId}`;
  }

  // Categories
  get getAllListingCategories(): string {
    return this.listingCategoryEndpoint;
  }

  get getListingCategoryByName(): string {
    return this.listingCategoryEndpoint + '/name';
  }

  // Files
  get uploadFileToBlob(): string {
    return `${this.blobEndpoint}/upload`;
  }

  // Reviews
  get createListingReview(): string {
    return this.reviewEndpoint;
  }
}
