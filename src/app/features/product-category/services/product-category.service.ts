import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IApiResponseModel } from '../../../core/models/api-response';
import { LoggingService } from '../../../core/services/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService,
    private readonly logger: LoggingService
  ) {}

  getAllProductCategories(): Observable<IApiResponseModel> {
    const endPoint = this.urlProvider.getAllProductCategories;

    return this.httpClient
      .get<IApiResponseModel>(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.logger.log('get all product categories request', error)
          )
        )
    );
  }
}
