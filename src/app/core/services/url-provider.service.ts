import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  private readonly baseUrl = 'https://localhost:5001/api';

  get createUser(): string {
    return `${this.baseUrl}/users`;
  }
}
