import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { ICreateListingResponse, ICreateListingRequest, IListingWithDetails } from '../models/listings';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private readonly httpClient = inject(HttpClient);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly toastr = inject(ToastrService);

  async getListings(): Promise<IListingWithDetails[]> {
    const endPoint = this.urlProvider.getListings;

    return await firstValueFrom(this.httpClient.get<IListingWithDetails[]>(endPoint))
      .catch((error) => {
        this.toastr.error('Failed to get listings');
        throw error;
      }
    );
  }

  async getListingById(id: number): Promise<IListingWithDetails> {
    const endPoint = this.urlProvider.getListingById(id);
  
    return await firstValueFrom(this.httpClient.get<IListingWithDetails>(endPoint))
      .catch((error) => {
        this.toastr.error('Failed to get listing by ID');
        throw error;
      }
    );
  }

  async getListingBySearchTerm(searchTerm: string): Promise<IListingWithDetails[]> {
    const endPoint = this.urlProvider.getListingBySearchTerm(searchTerm);
  
    return await firstValueFrom(this.httpClient.get<IListingWithDetails[]>(endPoint))
      .catch((error) => {
        this.toastr.error('Failed to get listings by search term');
        throw error;
      }
    );
  }

  async getListingsByCategoryName(categoryName: string): Promise<IListingWithDetails[]> {
    const endPoint = this.urlProvider.getListingsByCategoryName(categoryName);
  
    return await firstValueFrom(this.httpClient.get<IListingWithDetails[]>(endPoint))
      .catch((error) => {
        this.toastr.error('Failed to get listings by category name');
        throw error;
      }
    );
  }

  async getListingsByProviderId(providerId: string): Promise<IListingWithDetails[]> {
    const endPoint = this.urlProvider.getListingsByProviderId(providerId);
  
    return await firstValueFrom(this.httpClient.get<IListingWithDetails[]>(endPoint))
      .catch((error) => {
        this.toastr.error('Failed to get listings by ProviderId');
        throw error;
      }
    );
  }

  async createListing(listing: ICreateListingRequest): Promise<ICreateListingResponse> {
    const endPoint = this.urlProvider.createListing;
  
    return await firstValueFrom(this.httpClient.post<ICreateListingResponse>(endPoint, listing))
      .catch((error) => {
        this.toastr.success('Listing created successfully');
        return error;
      }
    )
  }
}
