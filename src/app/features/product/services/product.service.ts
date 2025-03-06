import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IApiResponseModel } from '../../../core/models/api-response';
import { UrlProviderService } from '../../../core/services/url-provider.service';
import { ToastrService } from 'ngx-toastr';
import { interpretError } from '../../../core/services/error-interpreter.function';
import { ICreatedProduct, ICreateProductRequest } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly urlProvider: UrlProviderService,
    private readonly toastr: ToastrService
  ) {}

  getAllProducts(): Observable<IApiResponseModel> {
    const endPoint = this.urlProvider.getAllProducts;

    return this.httpClient
      .get<IApiResponseModel>(endPoint)
      .pipe(
        catchError(error => 
          throwError(
            this.log('get all products request', error)
          )
        )
    );
  }

  createProduct(product: ICreateProductRequest): Observable<ICreatedProduct> {
    const endPoint = this.urlProvider.createProduct;
    
    return this.httpClient
      .post<ICreatedProduct>(endPoint, product)
      .pipe(
        map(response => {
          this.toastr.success('Product created successfully');
          return response;
        }),
        catchError(error => {
          this.toastr.error('Failed to create product');
          return throwError(this.log('create product request', error));
        })
      );
  }

  private log(serviceName: string, error: HttpErrorResponse): any {
    const compiledMessage =
        `Failed to ${serviceName} ${interpretError(error)}`.trim() +
        '\nPlease refresh your page to see the latest changes.';
    this.toastr.error(compiledMessage);
    return compiledMessage;
  }
}
