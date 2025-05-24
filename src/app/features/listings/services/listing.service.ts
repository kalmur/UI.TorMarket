import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { CreateListingResponse, CreateListingRequest, ListingWithDetails } from '../models/listings';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private readonly httpClient = inject(HttpClient);
  private readonly urlProvider = inject(UrlProviderService);
  private readonly toastr = inject(ToastrService);

  async getListings(): Promise<ListingWithDetails[]> {
    const endpoint = this.urlProvider.getListings;

    return await firstValueFrom(
      this.httpClient.get<ListingWithDetails[]>(endpoint)
    ).catch((error) => {
        this.toastr.error('Failed to get listings');
        throw error;
      }
    );
  }

  async getListingById(id: number): Promise<ListingWithDetails> {
    const endpoint = this.urlProvider.getListingById(id);
  
    return await firstValueFrom(
      this.httpClient.get<ListingWithDetails>(endpoint)
    ).catch((error) => {
        this.toastr.error('Failed to get listing by ID');
        throw error;
      }
    );
  }

  async getListingBySearchTerm(searchTerm: string): Promise<ListingWithDetails[]> {
    const endpoint = this.urlProvider.getListingBySearchTerm(searchTerm);
  
    return await firstValueFrom(
      this.httpClient.get<ListingWithDetails[]>(endpoint)
    ).catch((error) => {
        this.toastr.error('Failed to get listings by search term');
        throw error;
      }
    );
  }

  async getListingsByCategoryName(categoryName: string): Promise<ListingWithDetails[]> {
    const endPoint = this.urlProvider.getListingsByCategoryName(categoryName);
  
    return await firstValueFrom(
      this.httpClient.get<ListingWithDetails[]>(endPoint)
    ).catch((error) => {
        this.toastr.error('Failed to get listings by category name');
        throw error;
      }
    );
  }

  async getListingsByProviderId(providerId: string): Promise<ListingWithDetails[]> {
    const endpoint = this.urlProvider.getListingsByProviderId(providerId);
  
    return await firstValueFrom(
      this.httpClient.get<ListingWithDetails[]>(endpoint)
    ).catch((error) => {
        this.toastr.error('Failed to get listings by ProviderId');
        throw error;
      }
    );
  }

  async createListing(listing: CreateListingRequest): Promise<CreateListingResponse> {
    const endpoint = this.urlProvider.createListing;
  
    return await firstValueFrom(
      this.httpClient.post<CreateListingResponse>(endpoint, listing)
    ).catch((error) => {
        this.toastr.success('Listing created successfully');
        return error;
      }
    )
  }

  async uploadFileToBlob(formData: FormData): Promise<string> {
    const endpoint = this.urlProvider.uploadFileToBlob;

    return await firstValueFrom(
      this.httpClient.post<string>(endpoint, formData)
    ).catch((error) => {
        this.toastr.error('Failed to upload files');
        throw error;
      }
    );
  }

  async updateListingBlobUrls(listingId: number, blobUrl: string): Promise<void> {
    const endpoint = this.urlProvider.updateListingBlobUrls(listingId);

    const body = { blobUrl };
    
    return await firstValueFrom(
      this.httpClient.put<void>(endpoint, body)
    ).catch((error) => {
        this.toastr.error('Failed to update files');
        throw error;
      }
    );
  }
}
