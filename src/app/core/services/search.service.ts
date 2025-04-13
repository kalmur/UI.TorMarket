import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProviderService } from './url-provider.service';
import { LoggingService } from './logging.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService,
    private readonly logger: LoggingService
  ) {}

  getListingBySearchTerm(searchTerm: string) {
    const endPoint = this.urlProvider.getListingBySearchTerm(searchTerm);

    return this.httpClient
      .get(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.logger.log('get listing by search term request', error)
          )
        )
      );
  }
}
