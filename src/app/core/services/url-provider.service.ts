import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  private readonly baseUrl = 'http://localhost:5261/api';

  private readonly userEndpoint = `${this.baseUrl}/users`;
  private readonly productEnpoint = `${this.baseUrl}/product`;

  // Users
  get createUser(): string {
    return this.userEndpoint;
  }

  
  // Products
  get createProduct(): string {
    return this.productEnpoint;
  }

  get getAllProducts(): string {
    return this.productEnpoint;
  }
}
