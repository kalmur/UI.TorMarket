import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggingService } from '../../../core/services/logging.service';
import { ICategory } from '../../../core/models/categories';
import { IListing } from '../../listings/models/listings';

@Injectable({
  providedIn: 'root'
})
export class ListingCategoryService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService,
    private readonly logger: LoggingService
  ) {}

  getAllProductCategories(): Observable<ICategory[]> {
    const endPoint = this.urlProvider.getAllListingCategories;

    return this.httpClient
      .get<ICategory[]>(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.logger.log('get all product categories request', error)
          )
        )
    );
  }

  getListingsByCategory(categoryId: string): Observable<IListing[]> {
    const endPoint = this.urlProvider.getListingByCategory(categoryId);

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
}
