import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { ICreateListingResponse, ICreateListingRequest, IListing } from '../models/listings';
import { LoggingService } from '../../../core/services/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private readonly httpClient = inject(HttpClient);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly toastr = inject(ToastrService);
  private readonly logger = inject(LoggingService);

  async getListings(): Promise<IListing[]> {
    const endPoint = this.urlProvider.getListings;

    try {
      return await firstValueFrom(this.httpClient.get<IListing[]>(endPoint));
    } catch (error) {
      this.toastr.error('Failed to get listings');
      throw error;
    }
  }

  async getListingById(id: number): Promise<IListing> {
    const endPoint = this.urlProvider.getListingById(id);
  
    try {
      return await firstValueFrom(this.httpClient.get<IListing>(endPoint));
    } catch (error) {
      this.toastr.error('Failed to get listing by ID');
      throw error;
    }
  }

  async getListingBySearchTerm(searchTerm: string): Promise<IListing[]> {
    const endPoint = this.urlProvider.getListingBySearchTerm(searchTerm);
  
    try {
      return await firstValueFrom(this.httpClient.get<IListing[]>(endPoint));
    } catch (error) {
      this.toastr.error('Failed to get listings by search term');
      throw error;
    }
  }

  async getListingsByCategoryName(categoryName: string): Promise<IListing[]> {
    const endPoint = this.urlProvider.getListingsByCategoryName(categoryName);
  
    try {
      return await firstValueFrom(this.httpClient.get<IListing[]>(endPoint));
    } catch (error) {
      this.toastr.error('Failed to get listings by category name');
      throw error;
    }
  }

  async getListingsByProviderId(providerId: string): Promise<IListing[]> {
    const endPoint = this.urlProvider.getListingsByProviderId(providerId);
  
    try {
      return await firstValueFrom(this.httpClient.get<IListing[]>(endPoint));
    } catch (error) {
      this.toastr.error('Failed to get listings by ProviderId');
      throw error;
    }
  }

  async createListing(listing: ICreateListingRequest): Promise<ICreateListingResponse> {
    const endPoint = this.urlProvider.createListing;
  
    try {
      const response = await firstValueFrom(this.httpClient.post<ICreateListingResponse>(endPoint, listing));
      this.toastr.success('Listing created successfully');
      return response;
    } catch (error) {
      this.toastr.error('Failed to create listing');
      throw error;
    }
  }
}
