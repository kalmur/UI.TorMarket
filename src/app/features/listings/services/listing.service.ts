import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { ICreateListingResponse, ICreateListingRequest, IListing } from '../models/listings';
import { LoggingService } from '../../../core/services/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService,
    private readonly toastr: ToastrService,
    private readonly logger: LoggingService
  ) {}

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
