import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { ICreateListingResponse, ICreateListingRequest, IListing } from '../models/listings';
import { LoggingService } from '../../../core/services/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly urlProvider: UrlProviderService = inject(UrlProviderService);
  private readonly toastr: ToastrService = inject(ToastrService);
  private readonly logger: LoggingService = inject(LoggingService);

  getListings(): Observable<IListing[]> {
    const endPoint = this.urlProvider.getListings;
  
    return this.httpClient
      .get<IListing[]>(endPoint)
      .pipe(
        catchError(error => 
          throwError(() => 
            this.logger.log('get listings', error)
          )
        )
      );
  }

  getListingById(id: number): Observable<IListing> {
    const endPoint = this.urlProvider.getListingById(id);
  
    return this.httpClient
      .get<IListing>(endPoint)
      .pipe(
        catchError(error => 
          throwError(() => 
            this.logger.log('get listing by ID request', error)
          )
        )
      );
  }

  getListingBySearchTerm(searchTerm: string): Observable<IListing[]> {
    const endPoint = this.urlProvider.getListingBySearchTerm(searchTerm);
  
    return this.httpClient
      .get<IListing[]>(endPoint)
      .pipe(
        catchError(error => 
          throwError(() => 
            this.logger.log('get listings by search term', error)
          )
        )
      );
  }

  getListingsByCategoryName(categoryName: string): Observable<IListing[]> {
    const endPoint = this.urlProvider.getListingsByCategoryName(categoryName);

    return this.httpClient
      .get<IListing[]>(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.logger.log('get listing by category request', error)
          )
        )
    );
  }

  getListingsByProviderId(providerId: string): Observable<IListing[]> {
    const endPoint = this.urlProvider.getListingsByProviderId(providerId);

    return this.httpClient
      .get<IListing[]>(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.logger.log('get listing by category request', error)
          )
        )
    );
  }

  createListing(listing: ICreateListingRequest): Observable<ICreateListingResponse> {
    const endPoint = this.urlProvider.createListing;
  
    return this.httpClient
      .post<ICreateListingResponse>(endPoint, listing)
      .pipe(
        map(response => {
          this.toastr.success('Listing created successfully');
          return response;
        }),
        catchError(error => {
          this.toastr.error('Failed to create listing');
          return throwError(() => 
            this.logger.log('create listing', error)
          );
        })
      );
  }
}
