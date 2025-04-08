import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IApiResponseModel } from '../../../core/models/api-response';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { ICreatedListing, ICreateListingRequest } from '../models/listings';
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

  getAllListings(): Observable<IApiResponseModel> {
    const endPoint = this.urlProvider.getAllProducts;

    return this.httpClient
      .get<IApiResponseModel>(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.logger.log('get all products request', error)
          )
        )
    );
  }

  createListing(product: ICreateListingRequest): Observable<ICreatedListing> {
    const endPoint = this.urlProvider.createProduct;

    return this.httpClient
      .post<ICreatedListing>(endPoint, product)
      .pipe(
        map(response => {
          this.toastr.success('Listing created successfully');
          return response;
        }),
        catchError(error => {
          this.toastr.error('Failed to create listing');
          return throwError(
            this.logger.log('create listing request', error)
          );
        })
      );
  }
}
