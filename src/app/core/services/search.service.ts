import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProviderService } from './url-provider.service';
import { LoggingService } from './logging.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IListing } from '../../features/listings/models/listings';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService,
    private readonly logger: LoggingService
  ) {}

  getListingBySearchTerm(searchTerm: string): Observable<IListing[]> {
    const endPoint = this.urlProvider.getListingBySearchTerm(searchTerm);

    console.log(endPoint);
  
    return this.httpClient
      .get<IListing[]>(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.logger.log('get listing by search term request', error)
          )
        )
      );
  }
}
